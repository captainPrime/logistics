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
exports.priceAlgorithmDTO = exports.AdminWithdrawDTO = exports.HopperWithdrawDTO = exports.FundWalletDTO = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const transactions_1 = require("../../../transactions");
class FundWalletDTO {
    static _OPENAPI_METADATA_FACTORY() {
        return { amount: { required: true, type: () => Number } };
    }
}
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Min)(transactions_1.MINIMUM_AMOUNT),
    __metadata("design:type", Number)
], FundWalletDTO.prototype, "amount", void 0);
exports.FundWalletDTO = FundWalletDTO;
class HopperWithdrawDTO {
    static _OPENAPI_METADATA_FACTORY() {
        return { amount: { required: true, type: () => Number } };
    }
}
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Min)(transactions_1.MINIMUM_AMOUNT),
    __metadata("design:type", Number)
], HopperWithdrawDTO.prototype, "amount", void 0);
exports.HopperWithdrawDTO = HopperWithdrawDTO;
class AdminWithdrawDTO {
    static _OPENAPI_METADATA_FACTORY() {
        return { amount: { required: true, type: () => Number } };
    }
}
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Min)(transactions_1.MINIMUM_AMOUNT),
    __metadata("design:type", Number)
], AdminWithdrawDTO.prototype, "amount", void 0);
exports.AdminWithdrawDTO = AdminWithdrawDTO;
class priceAlgorithmDTO {
    static _OPENAPI_METADATA_FACTORY() {
        return { amount: { required: true, type: () => Number }, distance: { required: true, type: () => Number }, traffic: { required: true, type: () => Number }, averageVelocity: { required: true, type: () => Number }, surge: { required: true, type: () => Number }, waitingTime: { required: true, type: () => String } };
    }
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], priceAlgorithmDTO.prototype, "amount", void 0);
exports.priceAlgorithmDTO = priceAlgorithmDTO;
//# sourceMappingURL=transaction.validator.js.map