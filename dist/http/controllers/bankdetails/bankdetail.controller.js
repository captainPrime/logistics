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
exports.BankdetailsController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const bankdetails_1 = require("../../../bankdetails");
const bankdetail_validator_1 = require("./bankdetail.validator");
const middlewares_1 = require("../../middlewares");
const swagger_1 = require("@nestjs/swagger");
const paystack_1 = require("../../../internal/paystack");
const uuid_1 = require("uuid");
const errors_1 = require("../../../internal/errors");
let BankdetailsController = class BankdetailsController {
    constructor(bankdetailRepo, paystack) {
        this.bankdetailRepo = bankdetailRepo;
        this.paystack = paystack;
    }
    async add_bank_details(dto, req) {
        const user_in_session = req.user;
        const last_name = user_in_session.last_name;
        const first_name = user_in_session.first_name;
        const user_id = user_in_session.id;
        const account_number = dto.account_number;
        const bank_code = dto.bank_code;
        const [success, bank] = await this.paystack.retrieveSingleBank(bank_code);
        if (!success || !bank) {
            return { message: "Bank was not found" };
        }
        const exists = await this.bankdetailRepo.bank_exist(user_id, account_number);
        if (exists) {
            return { message: "Account Number already exist" };
        }
        const lastFiveAccountDigit = account_number.slice(-5);
        const account_number_display = "X".repeat(String(account_number).length - 5) + lastFiveAccountDigit;
        const account_name = `${last_name} ${first_name}`;
        const bank_name = bank.bank_name;
        const bank_id = (0, uuid_1.v4)();
        const raw = bank.parse();
        const bankdetailsDTO = {
            account_number,
            account_number_display,
            account_name,
            bank_name,
            bank_code,
            bank_id,
            raw,
            user: user_in_session,
        };
        const result = await this.bankdetailRepo.add_bank_details(bankdetailsDTO);
        return { result };
    }
    async update_transaction(req, user_id) {
        try {
            const bankdetail = await this.bankdetailRepo.find_bank_by_userid(user_id);
            if (!bankdetail)
                return;
            return bankdetail;
        }
        catch (err) {
            if (err instanceof paystack_1.InvalidSignature) {
                throw new errors_1.UnauthorizedRequest('sorry we could not verify the source of this request');
            }
            throw err;
        }
    }
};
__decorate([
    openapi.ApiOperation({ description: "Add Bank account details for withdrawal\n* @param dto" }),
    (0, common_1.UseGuards)(middlewares_1.AuthGuard),
    (0, common_1.Post)('add_bank_account'),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [bankdetail_validator_1.AddBankdetailsDTO, Object]),
    __metadata("design:returntype", Promise)
], BankdetailsController.prototype, "add_bank_details", null);
__decorate([
    (0, common_1.Get)('find_bankdetails/:user_id'),
    openapi.ApiResponse({ status: 200, type: [require("../../../bankdetails/bankdetail.model").Bankdetail] }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('user_id', new common_1.ParseUUIDPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], BankdetailsController.prototype, "update_transaction", null);
BankdetailsController = __decorate([
    (0, swagger_1.ApiTags)('Bankdetail'),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.Controller)('bankdetails'),
    __metadata("design:paramtypes", [bankdetails_1.BankdetailRepo,
        paystack_1.PaystackService])
], BankdetailsController);
exports.BankdetailsController = BankdetailsController;
//# sourceMappingURL=bankdetail.controller.js.map