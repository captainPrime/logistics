"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BankdetailRepo = void 0;
const typeorm_1 = require("typeorm");
const bankdetail_constant_1 = require("./bankdetail.constant");
const bankdetail_model_1 = require("./bankdetail.model");
let BankdetailRepo = class BankdetailRepo extends typeorm_1.Repository {
    add_bank_details(dto) {
        var _a;
        const bankdetail = new bankdetail_model_1.Bankdetail();
        bankdetail.user = dto.user;
        bankdetail.account_number = dto.account_number;
        bankdetail.account_number_display = dto.account_number_display;
        bankdetail.account_name = dto.account_name;
        bankdetail.bank_name = dto.bank_name;
        bankdetail.bank_code = dto.bank_code;
        bankdetail.raw = dto.raw;
        bankdetail.currency = (_a = dto.currency) !== null && _a !== void 0 ? _a : bankdetail_constant_1.CURRENCY.NAIRA;
        bankdetail.raw = dto.raw;
        bankdetail.bank_id = dto.bank_id;
        return this.save(bankdetail);
    }
    find_bank_by_userid(user_id) {
        return this.find({
            where: { user_id: user_id },
            relations: ['user'],
        });
    }
    bank_exist(user_id, account_number) {
        return this.find({
            where: {
                user_id,
                account_number
            },
            relations: ['user'],
        });
    }
};
BankdetailRepo = __decorate([
    (0, typeorm_1.EntityRepository)(bankdetail_model_1.Bankdetail)
], BankdetailRepo);
exports.BankdetailRepo = BankdetailRepo;
//# sourceMappingURL=bankdetail.repo.js.map