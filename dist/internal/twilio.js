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
exports.TwilioService = void 0;
const config_1 = require("@nestjs/config");
const env_keys_1 = require("../config/env.keys");
const common_1 = require("@nestjs/common");
const twilio_1 = require("twilio");
let TwilioService = class TwilioService {
    constructor(configService) {
        const sid = configService.get(env_keys_1.Env.twilio_account_sid);
        const auth_token = configService.get(env_keys_1.Env.twilio_auth_token);
        this.twilio = new twilio_1.Twilio(sid, auth_token);
        this.verification_service_sid = configService.get(env_keys_1.Env.twilio_verification_service_sid);
    }
    async send_verification_token(to) {
        await this.twilio.verify
            .services(this.verification_service_sid)
            .verifications.create({ to, channel: 'sms' });
        return null;
    }
    async verify_phone_number(phone_number, code) {
        try {
            const res = await this.twilio.verify
                .services(this.verification_service_sid)
                .verificationChecks.create({ to: phone_number, code });
            return res.status.toLowerCase() == 'approved';
        }
        catch (err) {
            if (err.code == '20404') {
                return false;
            }
            throw err;
        }
    }
};
TwilioService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], TwilioService);
exports.TwilioService = TwilioService;
//# sourceMappingURL=twilio.js.map