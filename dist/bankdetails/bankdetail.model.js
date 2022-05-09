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
exports.BankDetailsNotFound = exports.Bankdetail = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const model_1 = require("../internal/model");
const users_1 = require("../users");
const _1 = require(".");
let Bankdetail = class Bankdetail extends model_1.Model {
    static _OPENAPI_METADATA_FACTORY() {
        return { user: { required: true, type: () => require("../users/user.model").User, description: "user adding the bank details" }, account_number: { required: true, type: () => String, description: "bank account number" }, account_number_display: { required: true, type: () => String, description: "bank account number displayed or exposed" }, account_name: { required: true, type: () => String, description: "account name" }, bank_name: { required: true, type: () => String, description: "bank name" }, bank_code: { required: true, type: () => String, description: "bank identity code" }, bank_id: { required: true, type: () => String, description: "bank account id" }, raw: { required: false, type: () => Object, description: "raw data from bank provider" }, currency: { required: false, type: () => String, description: "bank currency", enum: require("./bankdetail.constant").CURRENCY } };
    }
};
__decorate([
    (0, typeorm_1.ManyToOne)(() => users_1.User),
    (0, typeorm_1.JoinColumn)({
        name: 'user_id',
    }),
    __metadata("design:type", users_1.User)
], Bankdetail.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true, select: false }),
    __metadata("design:type", String)
], Bankdetail.prototype, "account_number", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true, select: false }),
    __metadata("design:type", String)
], Bankdetail.prototype, "account_number_display", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true, select: false }),
    __metadata("design:type", String)
], Bankdetail.prototype, "account_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true, select: false }),
    __metadata("design:type", String)
], Bankdetail.prototype, "bank_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true, select: false }),
    __metadata("design:type", String)
], Bankdetail.prototype, "bank_code", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true, select: false }),
    __metadata("design:type", String)
], Bankdetail.prototype, "bank_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json', nullable: true }),
    __metadata("design:type", Object)
], Bankdetail.prototype, "raw", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: _1.CURRENCY.NAIRA }),
    __metadata("design:type", String)
], Bankdetail.prototype, "currency", void 0);
Bankdetail = __decorate([
    (0, typeorm_1.Entity)({ name: 'bankdetails' })
], Bankdetail);
exports.Bankdetail = Bankdetail;
class BankDetailsNotFound extends Error {
    constructor() {
        super("Whoops! Bank details not found");
    }
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.BankDetailsNotFound = BankDetailsNotFound;
//# sourceMappingURL=bankdetail.model.js.map