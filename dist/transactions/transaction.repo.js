"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionRepo = void 0;
const typeorm_1 = require("typeorm");
const transaction_constant_1 = require("./transaction.constant");
const transaction_model_1 = require("./transaction.model");
let TransactionRepo = class TransactionRepo extends typeorm_1.Repository {
    create_transaction(dto) {
        var _a;
        const transaction = new transaction_model_1.Transaction();
        transaction.user = dto.user;
        transaction.intent = dto.intent;
        transaction.transaction_type = dto.transaction_type;
        transaction.amount_intended = Number(dto.amount);
        transaction.status = transaction_constant_1.TRANSACTION_STATUS.INITIATED;
        transaction.provider = dto.provider;
        transaction.transaction_reference = dto.transaction_reference;
        transaction.raw = dto.raw;
        transaction.currency = (_a = dto.currency) !== null && _a !== void 0 ? _a : transaction_constant_1.CURRENCY.NAIRA;
        return this.save(transaction);
    }
    find_transaction_by_reference(reference) {
        return this.findOne({
            where: { transaction_reference: reference },
            relations: ['user'],
        });
    }
};
TransactionRepo = __decorate([
    (0, typeorm_1.EntityRepository)(transaction_model_1.Transaction)
], TransactionRepo);
exports.TransactionRepo = TransactionRepo;
//# sourceMappingURL=transaction.repo.js.map