"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserNotFound = exports.DuplicateUser = exports.UserRepo = void 0;
const user_model_1 = require("./user.model");
const typeorm_1 = require("typeorm");
const db_1 = require("../internal/db");
const common_1 = require("@nestjs/common");
const transactions_1 = require("../transactions");
let UserRepo = class UserRepo extends typeorm_1.Repository {
    async create_user(user_data) {
        let user = new user_model_1.User();
        user.email_address = user_data.email_address;
        user.first_name = user_data.first_name;
        user.last_name = user_data.last_name;
        user.phone_number = user_data.phone_number;
        user.account_type = user_model_1.ACCOUNT_TYPE.USER;
        try {
            user = await this.save(user);
            return user;
        }
        catch (err) {
            if (err.code === db_1.DB_ERROR_CODES.DUPLICATE) {
                throw new DuplicateUser();
            }
            throw err;
        }
    }
    async get_or_create_user_by_phone_number(phone_number) {
        let user = await this.findOne({
            where: { phone_number, account_type: (0, typeorm_1.Not)(user_model_1.ACCOUNT_TYPE.ADMIN) },
        });
        if (!user) {
            user = new user_model_1.User();
            user.phone_number = phone_number;
            user.account_type = user_model_1.ACCOUNT_TYPE.USER;
            user = await this.save(user);
        }
        return user;
    }
    async update_user(user_id, payload) {
        const user = await this.findOne(user_id);
        if (!user)
            throw new UserNotFound();
        if (payload.first_name)
            user.first_name = payload.first_name;
        if (payload.last_name)
            user.last_name = payload.last_name;
        if (payload.email_address)
            user.email_address = payload.email_address;
        return await this.save(user);
    }
    async find_or_create_user(params) {
        var _a, _b, _c, _d;
        let user;
        if (params.email_address) {
            user = await this.findOne({
                where: {
                    email_address: params.email_address,
                    account_type: (0, typeorm_1.Not)(user_model_1.ACCOUNT_TYPE.ADMIN),
                },
            });
        }
        else if (params.phone_number) {
            user = await this.findOne({
                where: {
                    phone_number: params.phone_number,
                    account_type: (0, typeorm_1.Not)(user_model_1.ACCOUNT_TYPE.ADMIN),
                },
            });
        }
        if (user)
            return user;
        user = new user_model_1.User();
        user.first_name = (_a = params.first_name) !== null && _a !== void 0 ? _a : null;
        user.last_name = (_b = params.last_name) !== null && _b !== void 0 ? _b : null;
        user.email_address = (_c = params.email_address) !== null && _c !== void 0 ? _c : null;
        user.phone_number = (_d = params.phone_number) !== null && _d !== void 0 ? _d : null;
        user.account_type = user_model_1.ACCOUNT_TYPE.USER;
        try {
            return await this.save(user);
        }
        catch (err) {
            if (err.code === db_1.DB_ERROR_CODES.DUPLICATE) {
                throw new DuplicateUser();
            }
            throw err;
        }
    }
    async update_user_balance(user) {
        return await this.query(`
    BEGIN;

    UPDATE
      users
    SET
      account_balance = (
        SELECT
          sum(nullif(native_amount,0))
        FROM
          transactions
        WHERE
          user_id = '${user.id}'
          AND status = '${transactions_1.TRANSACTION_STATUS.SUCCESSFUL}'
          AND native_amount IS NOT NULL)
      WHERE
        id = '${user.id}';

    COMMIT;
    `);
    }
};
UserRepo = __decorate([
    (0, common_1.Injectable)(),
    (0, typeorm_1.EntityRepository)(user_model_1.User)
], UserRepo);
exports.UserRepo = UserRepo;
class DuplicateUser extends Error {
    constructor() {
        super('A user with the given details already exists');
    }
}
exports.DuplicateUser = DuplicateUser;
class UserNotFound extends Error {
    constructor() {
        super('A user with the given identifier does not exist');
    }
}
exports.UserNotFound = UserNotFound;
//# sourceMappingURL=user.repo.js.map