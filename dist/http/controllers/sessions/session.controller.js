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
exports.SessionController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const utils_1 = require("../../../internal/utils");
const sessions_1 = require("../../../sessions");
const users_1 = require("../../../users");
const session_validator_1 = require("./session.validator");
const middlewares_1 = require("../../middlewares");
const bull_1 = require("@nestjs/bull");
const queue_1 = require("../../../internal/queue");
let SessionController = class SessionController {
    constructor(userRepo, helper, sessions, locationQueue) {
        this.userRepo = userRepo;
        this.helper = helper;
        this.sessions = sessions;
        this.locationQueue = locationQueue;
    }
    async create_user_session(_body) {
        if (!_body.email_address && !_body.phone_number)
            throw new common_1.BadRequestException('An email address or phone number is required at least.');
        if (_body.phone_number)
            _body.phone_number = this.helper.format_phone_number(_body.phone_number);
        const user = await this.userRepo.find_or_create_user(_body);
        const token = await this.sessions.create(user.id, user);
        return { token, user };
    }
    async get_user_in_session(req) {
        return req.user;
    }
    async update_location(req, dto) {
        const params = {
            user_id: req.user.id,
            location: [dto.lng, dto.lat],
        };
        await this.locationQueue.add(params);
        return 'Update success!';
    }
};
__decorate([
    (0, common_1.Post)('/'),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [session_validator_1.CreateSessionDTO]),
    __metadata("design:returntype", Promise)
], SessionController.prototype, "create_user_session", null);
__decorate([
    openapi.ApiOperation({ description: "Gets user in session" }),
    (0, common_1.Get)('/'),
    (0, common_1.UseGuards)(middlewares_1.AuthGuard),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    openapi.ApiResponse({ status: 200, type: require("../../../users/user.model").User }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SessionController.prototype, "get_user_in_session", null);
__decorate([
    openapi.ApiOperation({ description: "Hopper update current location" }),
    (0, common_1.Patch)('location'),
    (0, common_1.UseGuards)(middlewares_1.AuthGuard),
    openapi.ApiResponse({ status: 200, type: String }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, session_validator_1.LocationDTO]),
    __metadata("design:returntype", Promise)
], SessionController.prototype, "update_location", null);
SessionController = __decorate([
    (0, swagger_1.ApiTags)('Sessions'),
    (0, common_1.Controller)('sessions'),
    __param(3, (0, bull_1.InjectQueue)(queue_1.QUEUE.LOCATION)),
    __metadata("design:paramtypes", [users_1.UserRepo,
        utils_1.Helper,
        sessions_1.SessionStore, Object])
], SessionController);
exports.SessionController = SessionController;
//# sourceMappingURL=session.controller.js.map