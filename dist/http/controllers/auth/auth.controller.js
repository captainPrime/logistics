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
exports.AuthController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const utils_1 = require("../../../internal/utils");
const auth_validator_1 = require("./auth.validator");
const twilio_1 = require("../../../internal/twilio");
const users_1 = require("../../../users");
const sessions_1 = require("../../../sessions");
const swagger_1 = require("@nestjs/swagger");
let AuthController = class AuthController {
    constructor(twilioService, helpers, userRepo, sessions) {
        this.twilioService = twilioService;
        this.helpers = helpers;
        this.userRepo = userRepo;
        this.sessions = sessions;
    }
    async send_verification_code(payload) {
        const phone_number = this.helpers.format_phone_number(payload.phone_number);
        await this.twilioService.send_verification_token(phone_number);
        return `Verification code has been sent to ${phone_number}`;
    }
    async verify_phone_number(payload) {
        const phone_number = this.helpers.format_phone_number(payload.phone_number);
        const verified = await this.twilioService.verify_phone_number(phone_number, payload.code);
        if (!verified) {
            throw new common_1.BadRequestException('The provided code is invalid');
        }
        const user = await this.userRepo.get_or_create_user_by_phone_number(phone_number);
        const token = await this.sessions.create(user.email_address, user);
        return { token, user };
    }
};
__decorate([
    openapi.ApiOperation({ description: "Sends verification phone to a phone number prior to granting authorization" }),
    (0, common_1.Post)('/phone'),
    openapi.ApiResponse({ status: 201, type: String }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_validator_1.SendCodeDTO]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "send_verification_code", null);
__decorate([
    openapi.ApiOperation({ description: "validates phone verification and creates session if successful. throws exception on validation failure" }),
    (0, common_1.Post)('/phone/verify'),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_validator_1.VerifyPhoneDTO]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "verify_phone_number", null);
AuthController = __decorate([
    (0, swagger_1.ApiTags)('Auth'),
    (0, common_1.Controller)('auth'),
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [twilio_1.TwilioService,
        utils_1.Helper,
        users_1.UserRepo,
        sessions_1.SessionStore])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map