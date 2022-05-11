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
exports.UserController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const middlewares_1 = require("../../middlewares");
const errors_1 = require("../../../internal/errors");
const utils_1 = require("../../../internal/utils");
const sessions_1 = require("../../../sessions");
const users_1 = require("../../../users");
const hoppers_1 = require("../../../hoppers");
const user_validator_1 = require("./user.validator");
const hopper_validator_1 = require("./hopper.validator");
let UserController = class UserController {
    constructor(userRepo, helper, sessions, hopperRepo) {
        this.userRepo = userRepo;
        this.helper = helper;
        this.sessions = sessions;
        this.hopperRepo = hopperRepo;
    }
    async create_user(payload) {
        try {
            payload.phone_number = this.helper.format_phone_number(payload.phone_number);
            return await this.userRepo.create_user(payload);
        }
        catch (err) {
            if (err instanceof users_1.DuplicateUser) {
                throw new common_1.BadRequestException(err.message);
            }
            throw err;
        }
    }
    async update_user(user_id, payload) {
        try {
            const user = await this.userRepo.update_user(user_id, payload);
            await this.sessions.update(user.email_address, user);
            return user;
        }
        catch (err) {
            if (err instanceof users_1.UserNotFound)
                throw new common_1.BadRequestException(err.message);
            if (err instanceof sessions_1.KeyNotFound)
                throw new errors_1.UnauthorizedRequest();
            throw err;
        }
    }
    async find_user(email_address) {
        try {
            const user_detail = await this.userRepo.get_user_by_user_id(email_address);
            if (!user_detail)
                return;
            return user_detail;
        }
        catch (err) {
            if (err instanceof users_1.UserNotFound)
                throw new common_1.BadRequestException(err.message);
            if (err instanceof sessions_1.KeyNotFound)
                throw new errors_1.UnauthorizedRequest();
            throw err;
        }
    }
    async create_hopper_application(req) {
        try {
            return await this.hopperRepo.create_hopper(req.user);
        }
        catch (err) {
            if (err instanceof hoppers_1.DuplicateHopper) {
                throw new common_1.BadRequestException(err.message);
            }
            throw err;
        }
    }
    async hopper_reapplication(req) {
        try {
            const hopper = await this.hopperRepo.get_hopper_by_user(req.user);
            return await this.hopperRepo.update_hopper_status(hopper, hoppers_1.HOPPER_STATUS.APPLIED);
        }
        catch (err) {
            if (err instanceof hoppers_1.HopperNotFound) {
                throw new common_1.BadRequestException(err.message);
            }
            if (err instanceof hoppers_1.InvalidHopperStatusMove) {
                throw new common_1.BadRequestException('sorry, you can only reply for a declined application');
            }
            throw err;
        }
    }
    async update_application(hopper_id, dto) {
        try {
            const hopper = await this.hopperRepo.get_hopper(hopper_id);
            return await this.hopperRepo.update_hopper_status(hopper, dto.status);
        }
        catch (err) {
            if (err instanceof hoppers_1.HopperNotFound) {
                throw new common_1.BadRequestException(err.message);
            }
            if (err instanceof hoppers_1.InvalidHopperStatusMove) {
                throw new common_1.BadRequestException(err.message);
            }
            throw err;
        }
    }
    async find_hopper(hopper_id) {
        try {
            const hopper = await this.hopperRepo.get_hopper(hopper_id);
            return await this.hopperRepo.find_one_avaliable_hopper(hopper, hoppers_1.HOPPER_STATUS.APPLIED);
        }
        catch (err) {
            if (err instanceof hoppers_1.HopperNotFound) {
                throw new common_1.BadRequestException(err.message);
            }
            if (err instanceof hoppers_1.InvalidHopperStatusMove) {
                throw new common_1.BadRequestException(err.message);
            }
            throw err;
        }
    }
    async track_hopper(hopper_id, dto) {
        try {
            const hopper = await this.hopperRepo.get_hopper(hopper_id);
            return await this.hopperRepo.update_hopper_status(hopper, hoppers_1.HOPPER_STATUS.BOOKED);
        }
        catch (err) {
            if (err instanceof hoppers_1.HopperNotFound) {
                throw new common_1.BadRequestException(err.message);
            }
            if (err instanceof hoppers_1.InvalidHopperStatusMove) {
                throw new common_1.BadRequestException(err.message);
            }
            throw err;
        }
    }
    async rate_hopper(hopper_id, dto) {
        try {
            const hopper = await this.hopperRepo.get_hopper(hopper_id);
            return await this.hopperRepo.update_hopper_status(hopper, hoppers_1.HOPPER_STATUS.BOOKED);
        }
        catch (err) {
            if (err instanceof hoppers_1.HopperNotFound) {
                throw new common_1.BadRequestException(err.message);
            }
            if (err instanceof hoppers_1.InvalidHopperStatusMove) {
                throw new common_1.BadRequestException(err.message);
            }
            throw err;
        }
    }
};
__decorate([
    (0, common_1.Post)('/'),
    openapi.ApiResponse({ status: 201, type: require("../../../users/user.model").User }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_validator_1.UserDTO]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "create_user", null);
__decorate([
    openapi.ApiOperation({ description: "updates a user in the system" }),
    (0, common_1.Put)('/:user_id'),
    openapi.ApiResponse({ status: 200, type: require("../../../users/user.model").User }),
    __param(0, (0, common_1.Param)('user_id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_validator_1.UpdateUserDTO]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "update_user", null);
__decorate([
    openapi.ApiOperation({ description: "find a user in the system" }),
    (0, common_1.Get)('/find_user/:email_address'),
    openapi.ApiResponse({ status: 200, type: require("../../../users/user.model").User }),
    __param(0, (0, common_1.Param)('email_address')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "find_user", null);
__decorate([
    openapi.ApiOperation({ description: "Creates a new hopper application" }),
    (0, common_1.Post)('/hoppers/apply'),
    openapi.ApiResponse({ status: 201, type: require("../../../hoppers/hopper.model").Hopper }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "create_hopper_application", null);
__decorate([
    openapi.ApiOperation({ description: "Reinitializes an already declind hopper application" }),
    (0, common_1.Post)('/hoppers/re-apply'),
    openapi.ApiResponse({ status: 201, type: require("../../../hoppers/hopper.model").Hopper }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "hopper_reapplication", null);
__decorate([
    openapi.ApiOperation({ description: "Admin update hopper application" }),
    (0, common_1.Patch)('/hoppers/:hopper_id/status'),
    openapi.ApiResponse({ status: 200, type: require("../../../hoppers/hopper.model").Hopper }),
    __param(0, (0, common_1.Param)('hopper_id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, hopper_validator_1.UpdateHopperDTO]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "update_application", null);
__decorate([
    openapi.ApiOperation({ description: "Find available Hopper" }),
    (0, common_1.Patch)('/hoppers/:hopper_id/find'),
    openapi.ApiResponse({ status: 200, type: require("../../../hoppers/hopper.model").Hopper }),
    __param(0, (0, common_1.Param)('hopper_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "find_hopper", null);
__decorate([
    openapi.ApiOperation({ description: "Track an Hopper" }),
    (0, common_1.Patch)('/hoppers/:hopper_id/track'),
    openapi.ApiResponse({ status: 200, type: require("../../../hoppers/hopper.model").Hopper }),
    __param(0, (0, common_1.Param)('hopper_id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, hopper_validator_1.UpdateHopperDTO]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "track_hopper", null);
__decorate([
    openapi.ApiOperation({ description: "Rate an Hopper after delivery" }),
    (0, common_1.Post)('/hoppers/:hopper_id/rate'),
    openapi.ApiResponse({ status: 201, type: require("../../../hoppers/hopper.model").Hopper }),
    __param(0, (0, common_1.Param)('hopper_id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "rate_hopper", null);
UserController = __decorate([
    (0, swagger_1.ApiTags)('Users'),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.UseGuards)(middlewares_1.AuthGuard),
    (0, common_1.Controller)('/users'),
    __metadata("design:paramtypes", [users_1.UserRepo,
        utils_1.Helper,
        sessions_1.SessionStore,
        hoppers_1.HopperRepo])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map