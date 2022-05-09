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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionNotFound = exports.Transaction = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const transaction_constant_1 = require("./transaction.constant");
const model_1 = require("../internal/model");
const users_1 = require("../users");
const _1 = require(".");
const db_1 = require("../internal/db");
let Transaction = class Transaction extends model_1.Model {
    static _OPENAPI_METADATA_FACTORY() {
        return { user: { required: true, type: () => require("../users/user.model").User, description: "user making the transaction" }, intent: { required: true, description: "Reason for transaction", enum: require("./transaction.constant").TRANSACTION_INTENTS }, transaction_type: { required: true, description: "type of transaction user is making", enum: require("./transaction.constant").TRANSACTION_TYPES }, amount_intended: { required: true, type: () => Number, description: "intended transaction amount" }, amount_paid: { required: true, type: () => Number, description: "amount received from payment gateway" }, native_amount: { required: true, type: () => Number, description: "native amount used for DB analysis" }, status: { required: true, description: "stats of transaction", enum: require("./transaction.constant").TRANSACTION_STATUS }, provider: { required: true, type: () => String, description: "transaction provider", enum: require("./transaction.constant").TRANSACTION_PROVIDERS }, transaction_reference: { required: true, type: () => String, description: "transaction provider reference" }, raw: { required: false, type: () => Object, description: "raw data from transaction provider" }, currency: { required: false, type: () => String, description: "transaction currency", enum: require("./transaction.constant").CURRENCY } };
    }
};
__decorate([
    (0, typeorm_1.ManyToOne)(() => users_1.User),
    (0, typeorm_1.JoinColumn)({
        name: 'user_id',
    }),
    __metadata("design:type", users_1.User)
], Transaction.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Transaction.prototype, "intent", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Transaction.prototype, "transaction_type", void 0);
__decorate([
    (0, typeorm_1.Column)(Object.assign(Object.assign({}, db_1.numeric), { unsigned: true })),
    __metadata("design:type", Number)
], Transaction.prototype, "amount_intended", void 0);
__decorate([
    (0, typeorm_1.Column)(Object.assign(Object.assign({}, db_1.numeric), { unsigned: true, nullable: true })),
    __metadata("design:type", Number)
], Transaction.prototype, "amount_paid", void 0);
__decorate([
    (0, typeorm_1.Column)(Object.assign(Object.assign({ select: false }, db_1.numeric), { nullable: true })),
    __metadata("design:type", Number)
], Transaction.prototype, "native_amount", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Transaction.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Transaction.prototype, "provider", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true, select: false }),
    __metadata("design:type", String)
], Transaction.prototype, "transaction_reference", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json', nullable: true }),
    __metadata("design:type", Object)
], Transaction.prototype, "raw", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: _1.CURRENCY.NAIRA }),
    __metadata("design:type", String)
], Transaction.prototype, "currency", void 0);
Transaction = __decorate([
    (0, typeorm_1.Entity)({ name: 'transactions' })
], Transaction);
exports.Transaction = Transaction;
class TransactionNotFound extends Error {
    constructor() {
        super("Whoops! the provided reference doesn't match any of our records");
    }
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.TransactionNotFound = TransactionNotFound;
//# sourceMappingURL=transaction.model.js.map