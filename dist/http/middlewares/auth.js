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
exports.AdminGuard = exports.AuthGuard = void 0;
const common_1 = require("@nestjs/common");
const sessions_1 = require("../../sessions");
const errors_1 = require("../../internal/errors");
const users_1 = require("../../users");
let AuthGuard = class AuthGuard {
    constructor(sessions) {
        this.sessions = sessions;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const authSession = request.headers.authorization;
        if (!authSession) {
            throw new errors_1.UnauthorizedRequest('We could not authenticate your request');
        }
        const [scheme, token] = authSession.split(/\s+/);
        if (scheme !== 'Bearer') {
            throw new errors_1.UnauthorizedRequest(`${scheme} is not supported. Please use the Bearer scheme`);
        }
        const session = await this.sessions.get(token);
        if (!session) {
            throw new errors_1.UnauthorizedRequest('We could not find a session for your request');
        }
        request.user = JSON.parse(session);
        return true;
    }
};
AuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [sessions_1.SessionStore])
], AuthGuard);
exports.AuthGuard = AuthGuard;
let AdminGuard = class AdminGuard {
    canActivate(context) {
        var _a;
        const req = context.switchToHttp().getRequest();
        if (((_a = req.user) === null || _a === void 0 ? void 0 : _a.account_type) !== users_1.ACCOUNT_TYPE.ADMIN) {
            throw new common_1.ForbiddenException('You do not have authorized access to this resource');
        }
        return true;
    }
};
AdminGuard = __decorate([
    (0, common_1.Injectable)()
], AdminGuard);
exports.AdminGuard = AdminGuard;
//# sourceMappingURL=auth.js.map