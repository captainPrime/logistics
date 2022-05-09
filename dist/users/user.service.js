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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const user_repo_1 = require("./user.repo");
const events_1 = require("../internal/events");
const user_model_1 = require("./user.model");
const sessions_1 = require("../sessions");
const event_emitter_1 = require("@nestjs/event-emitter");
let UserService = class UserService {
    constructor(user_repo, sessions) {
        this.user_repo = user_repo;
        this.sessions = sessions;
    }
    async update_wallet_balance(user) {
        console.log('updating user balance');
        await this.user_repo.update_user_balance(user);
        await this.sessions.update(user.id, await this.user_repo.findOne(user.id));
    }
};
__decorate([
    (0, event_emitter_1.OnEvent)(events_1.UPDATE_WALLET_BALANCE, { async: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_model_1.User]),
    __metadata("design:returntype", Promise)
], UserService.prototype, "update_wallet_balance", null);
UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_repo_1.UserRepo,
        sessions_1.SessionStore])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map