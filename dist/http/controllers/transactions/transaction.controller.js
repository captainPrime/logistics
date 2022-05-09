"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const transactions_1 = require("../../../transactions");
const transaction_validator_1 = require("./transaction.validator");
const middlewares_1 = require("../../middlewares");
const swagger_1 = require("@nestjs/swagger");
const paystack_1 = require("../../../internal/paystack");
const hoppers_1 = require("../../../hoppers");
const errors_1 = require("../../../internal/errors");
const event_emitter_1 = require("@nestjs/event-emitter");
const events_1 = require("../../../internal/events");
const hopper_validator_1 = require("../users/hopper.validator");
let TransactionController = class TransactionController {
    constructor(transactionRepo, paystack, emitter, hopperRepo) {
        this.transactionRepo = transactionRepo;
        this.paystack = paystack;
        this.emitter = emitter;
        this.hopperRepo = hopperRepo;
    }
    async initialize_wallet_funding(body, req) {
        const amount = body.amount;
        const user_in_session = req.user;
        const intent = transactions_1.TRANSACTION_INTENTS.WALLET_FUNDING;
        const metadata = {
            user_id: user_in_session.id,
            intent,
        };
        const { data } = await this.paystack.initialize_transaction(amount, JSON.stringify(metadata));
        const { authorization_url, reference } = data;
        const transactionDTO = {
            amount,
            intent,
            transaction_type: transactions_1.TRANSACTION_TYPES.CREDIT,
            user: user_in_session,
            provider: transactions_1.TRANSACTION_PROVIDERS.PAYSTACK,
            transaction_reference: reference,
        };
        const { id } = await this.transactionRepo.create_transaction(transactionDTO);
        return { payment_url: authorization_url, transaction_id: id };
    }
    async update_transaction(req) {
        try {
            const signature = req.headers['x-paystack-signature'];
            const dto = this.paystack.verify_hash(signature, req.body);
            const transaction = await this.transactionRepo.find_transaction_by_reference(dto.data.reference);
            if (!transaction)
                return;
            transaction.raw = JSON.stringify(dto);
            switch (dto.event) {
                case paystack_1.PAYSTACK_EVENTS.CHARGE_SUCCESS:
                    transaction.status = transactions_1.TRANSACTION_STATUS.SUCCESSFUL;
                    transaction.amount_paid = Number(dto.data.amount) / 100;
                    transaction.native_amount =
                        transaction.transaction_type == transactions_1.TRANSACTION_TYPES.CREDIT
                            ? transaction.amount_paid
                            : transaction.amount_paid * -1;
                    break;
                default:
                    break;
            }
            await this.transactionRepo.save(transaction);
            this.emitter.emit(events_1.UPDATE_WALLET_BALANCE, transaction.user);
            return 'ok';
        }
        catch (err) {
            if (err instanceof paystack_1.InvalidSignature) {
                throw new errors_1.UnauthorizedRequest('sorry we could not verify the source of this request');
            }
            throw err;
        }
    }
    async get_transaction(transaction_id) {
        try {
            const transaction = await this.transactionRepo.findOne(transaction_id);
            if (!transaction)
                throw new transactions_1.TransactionNotFound();
            return transaction;
        }
        catch (err) {
            if (err instanceof transactions_1.TransactionNotFound) {
                throw new common_1.BadRequestException(err.message);
            }
        }
    }
    async hopper_withdrawal(hopper_id, dto, req) {
        try {
            const hopper = await this.hopperRepo.get_hopper(hopper_id);
            return await this.hopperRepo.update_hopper_status(hopper, dto.status);
        }
        catch (err) {
            if (err instanceof hoppers_1.HopperNotFound) {
                throw new common_1.BadRequestException(err.message);
            }
            if (err instanceof hoppers_1.InvalidHopperStatusMove) {
                throw new common_1.BadRequestException(err.message);
            }
            throw err;
        }
    }
    async admin_withdrawal(hopper_id, dto) {
        try {
            const hopper = await this.hopperRepo.get_hopper(hopper_id);
            return await this.hopperRepo.update_hopper_status(hopper, dto.status);
        }
        catch (err) {
            if (err instanceof hoppers_1.HopperNotFound) {
                throw new common_1.BadRequestException(err.message);
            }
            if (err instanceof hoppers_1.InvalidHopperStatusMove) {
                throw new common_1.BadRequestException(err.message);
            }
            throw err;
        }
    }
    async destination_price(hopper_id, dto) {
        try {
            const hopper = await this.hopperRepo.get_hopper(hopper_id);
            const d = new Date();
            const amOrPm = (d.getHours() < 12) ? "AM" : "PM";
            const daylightOrNight = amOrPm;
            let distance;
            if (daylightOrNight === "AM") {
                distance = (dto.distance) * 95;
            }
            else if (daylightOrNight === "PM") {
                distance = (dto.distance) * 95;
            }
            const hopper_distance = hopper;
            const traffic = (dto.traffic) * 120;
            const averageVelocity = dto.averageVelocity;
            const surge = dto.surge * 120;
            const waitingTime = dto.waitingTime;
            console.log("daylightOrNight", daylightOrNight);
            const totalPrice = (distance + traffic + averageVelocity + surge + waitingTime + hopper_distance);
            return totalPrice;
        }
        catch (err) {
            if (err instanceof hoppers_1.HopperNotFound) {
                throw new common_1.BadRequestException(err.message);
            }
            if (err instanceof hoppers_1.InvalidHopperStatusMove) {
                throw new common_1.BadRequestException(err.message);
            }
            throw err;
        }
    }
};
__decorate([
    openapi.ApiOperation({ description: "Initializes a wallet funding process" }),
    (0, common_1.UseGuards)(middlewares_1.AuthGuard),
    (0, common_1.Post)('wallet-funding'),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [transaction_validator_1.FundWalletDTO, Object]),
    __metadata("design:returntype", Promise)
], TransactionController.prototype, "initialize_wallet_funding", null);
__decorate([
    (0, common_1.Post)('paystack-webhook'),
    openapi.ApiResponse({ status: 201, type: String }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TransactionController.prototype, "update_transaction", null);
__decorate([
    (0, common_1.Get)('/:transaction_id'),
    openapi.ApiResponse({ status: 200, type: require("../../../transactions/transaction.model").Transaction }),
    __param(0, (0, common_1.Param)('transaction_id', new common_1.ParseUUIDPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TransactionController.prototype, "get_transaction", null);
__decorate([
    openapi.ApiOperation({ description: "Creates Hopper Withdrawal" }),
    (0, common_1.Post)('hoppers/:hopper_id/withdraw'),
    openapi.ApiResponse({ status: 201, type: require("../../../hoppers/hopper.model").Hopper }),
    __param(0, (0, common_1.Param)('hopper_id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, hopper_validator_1.UpdateHopperDTO, Object]),
    __metadata("design:returntype", Promise)
], TransactionController.prototype, "hopper_withdrawal", null);
__decorate([
    openapi.ApiOperation({ description: "Admin Withdrawal" }),
    (0, common_1.Post)('admin/:admin_id/withdraw'),
    openapi.ApiResponse({ status: 201, type: require("../../../hoppers/hopper.model").Hopper }),
    __param(0, (0, common_1.Param)('admin_id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, hopper_validator_1.UpdateHopperDTO]),
    __metadata("design:returntype", Promise)
], TransactionController.prototype, "admin_withdrawal", null);
__decorate([
    openapi.ApiOperation({ description: "Price Determination algorithm" }),
    (0, common_1.Post)('hoppers/:hopper_id/price'),
    openapi.ApiResponse({ status: 201, type: String }),
    __param(0, (0, common_1.Param)('hopper_id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, transaction_validator_1.priceAlgorithmDTO]),
    __metadata("design:returntype", Promise)
], TransactionController.prototype, "destination_price", null);
TransactionController = __decorate([
    (0, swagger_1.ApiTags)('Transactions'),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.Controller)('transactions'),
    __metadata("design:paramtypes", [transactions_1.TransactionRepo,
        paystack_1.PaystackService,
        event_emitter_1.EventEmitter2,
        hoppers_1.HopperRepo])
], TransactionController);
exports.TransactionController = TransactionController;
//# sourceMappingURL=transaction.controller.js.map