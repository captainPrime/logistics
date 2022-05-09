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
exports.ACCOUNT_TYPE = exports.User = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const model_1 = require("../internal/model");
const db_1 = require("../internal/db");
const hopper_model_1 = require("../hoppers/hopper.model");
const orders_1 = require("../orders");
let User = class User extends model_1.Model {
    transform_fields_to_lowercase() {
        if (this.first_name)
            this.first_name = this.first_name.toLowerCase();
        if (this.last_name)
            this.last_name = this.last_name.toLowerCase();
        if (this.email_address)
            this.email_address = this.email_address.toLowerCase();
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { first_name: { required: false, type: () => String, description: "user's first name" }, last_name: { required: false, type: () => String, description: "user's last name" }, email_address: { required: false, type: () => String, description: "user's email address.\nemail address is tranaformed to lower case to avoid case sensitivity search" }, phone_number: { required: true, type: () => String, description: "user's phone number\nphone number must already be formated in +234 format" }, account_type: { required: true, description: "type of user", enum: require("./user.model").ACCOUNT_TYPE }, account_balance: { required: true, type: () => Number, description: "current account balance" }, hopper: { required: true, type: () => require("../hoppers/hopper.model").Hopper, description: "User relationships" }, orders: { required: true, type: () => [require("../orders/order.model").Order] } };
    }
};
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "first_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "last_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, unique: true }),
    __metadata("design:type", String)
], User.prototype, "email_address", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true, nullable: true }),
    __metadata("design:type", String)
], User.prototype, "phone_number", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "account_type", void 0);
__decorate([
    (0, typeorm_1.Column)(Object.assign(Object.assign({}, db_1.numeric), { unsigned: true, default: 0.0 })),
    __metadata("design:type", Number)
], User.prototype, "account_balance", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], User.prototype, "transform_fields_to_lowercase", null);
__decorate([
    (0, typeorm_1.OneToOne)(() => hopper_model_1.Hopper, (h) => h.user),
    __metadata("design:type", hopper_model_1.Hopper)
], User.prototype, "hopper", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => orders_1.Order, (o) => o.user),
    __metadata("design:type", Array)
], User.prototype, "orders", void 0);
User = __decorate([
    (0, typeorm_1.Entity)({ name: 'users' })
], User);
exports.User = User;
var ACCOUNT_TYPE;
(function (ACCOUNT_TYPE) {
    ACCOUNT_TYPE["USER"] = "user";
    ACCOUNT_TYPE["HOPPER"] = "hopper";
    ACCOUNT_TYPE["ADMIN"] = "admin";
})(ACCOUNT_TYPE = exports.ACCOUNT_TYPE || (exports.ACCOUNT_TYPE = {}));
//# sourceMappingURL=user.model.js.map