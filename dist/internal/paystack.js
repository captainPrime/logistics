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
exports.InvalidSignature = exports.PaystackService = exports.PAYSTACK_EVENTS = void 0;
const env_keys_1 = require("../config/env.keys");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const crypto_1 = require("crypto");
const http_1 = require("./http");
const uuid_1 = require("uuid");
var PAYSTACK_EVENTS;
(function (PAYSTACK_EVENTS) {
    PAYSTACK_EVENTS["CHARGE_SUCCESS"] = "charge.success";
})(PAYSTACK_EVENTS = exports.PAYSTACK_EVENTS || (exports.PAYSTACK_EVENTS = {}));
let PaystackService = class PaystackService {
    constructor(http, config) {
        this.http = http;
        this.base_url = 'https://api.paystack.co/transaction/';
        this.retrieveBanks = async (country = "nigeria") => {
            const url = `/bank/country=${country}`;
            try {
                const response = await this.make_request(url, http_1.HttpMethod.GET);
                const { data } = await response.data;
                return [true, data];
            }
            catch (error) {
                const response = await error.response;
                return [false, response.data, response.status];
            }
        };
        this.retrieveSingleBank = async (bankCode, country = "nigeria") => {
            const [success, data, error] = await this.retrieveBanks(country);
            if (!success) {
                return [success, data, error];
            }
            const singleBank = data.find((bank) => String(bank.code) === String(bankCode));
            console.log("paystack single bank", data);
            return [true, singleBank];
        };
        this.secret_key = config.get(env_keys_1.Env.paystack_sk);
        this.email_address = config.get(env_keys_1.Env.paystack_account_email);
    }
    make_request(url, method, data = {}, headers = {}) {
        headers['Authorization'] = `Bearer ${this.secret_key}`;
        headers['Content-Type'] = 'application/json';
        return { url, headers, method, data };
    }
    initialize_transaction(amount_in_naira, meta) {
        const url = `${this.base_url}initialize`;
        const data = {};
        data['amount'] = amount_in_naira * 100;
        data['metadata'] = meta;
        data['email'] = this.email_address;
        const request = this.make_request(url, http_1.HttpMethod.POST, data);
        return this.http.do(request);
    }
    withdraw_transaction(amount_in_naira, meta, bankDetails, userData) {
        const transferUrl = `${this.base_url}initialize`;
        const data = {};
        data['type'] = "";
        data['name'] = "";
        data['bank_code'] = "";
        data['account_number'] = "";
        data['currency'] = "NGN";
        const request = this.make_request(transferUrl, http_1.HttpMethod.POST, data);
        const responseCreateReciepientData = request.data;
        console.log("responseCreateReciepientData============>", responseCreateReciepientData);
        const recipientCode = responseCreateReciepientData.recipient_code;
        if (recipientCode) {
            const referenceId = (0, uuid_1.v4)();
            const url = `${this.base_url}transfer`;
            const data = {};
            data['amount'] = amount_in_naira * 100;
            data['metadata'] = meta;
            data['email'] = this.email_address;
            data['reason'] = `Withdrawal from your Quickbunny wallet`;
            data['currency'] = "NGN";
            data['reference'] = referenceId;
            data['callbackURL'] = "https://webhook.site/041a3538-d5d3-4a37-a9c1-2dcab86f88ff";
            const withdrawRequest = this.make_request(url, http_1.HttpMethod.POST, data);
            return this.http.do(withdrawRequest);
        }
    }
    get_transaction(reference) {
        const url = `${this.base_url}verify/${reference}`;
        const request = this.make_request(url, http_1.HttpMethod.GET);
        return this.http.do(request);
    }
    verify_hash(signature, request_body) {
        const hash = (0, crypto_1.createHmac)('sha512', this.secret_key)
            .update(JSON.stringify(request_body))
            .digest('hex');
        if (hash !== signature)
            throw new InvalidSignature();
        return request_body;
    }
};
PaystackService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [http_1.HttpClient, config_1.ConfigService])
], PaystackService);
exports.PaystackService = PaystackService;
class InvalidSignature extends Error {
    constructor() {
        super('invalid request signature');
    }
}
exports.InvalidSignature = InvalidSignature;
//# sourceMappingURL=paystack.js.map