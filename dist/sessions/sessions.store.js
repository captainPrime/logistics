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
exports.KeyNotFound = exports.SessionStore = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const crypto_1 = require("crypto");
const env_keys_1 = require("../config/env.keys");
(0, common_1.Injectable)();
let SessionStore = class SessionStore {
    constructor(cache, configService) {
        this.cache = cache;
        this.secret = configService.get(env_keys_1.Env.service_secret);
    }
    async create(key, payload, ttl = 0) {
        const token = this.get_token(key);
        const content = JSON.stringify(payload);
        await this.store(token, content, ttl);
        return token;
    }
    async update(key, payload, ttl = 0) {
        const token = this.get_token(key);
        let content = await this.cache.get(token);
        if (!content)
            throw new KeyNotFound();
        content = JSON.stringify(payload);
        await this.store(token, content, ttl);
        return true;
    }
    get(token) {
        return this.cache.get(token);
    }
    get_token(key) {
        return (0, crypto_1.createHmac)('sha256', this.secret).update(key).digest('hex');
    }
    async store(key, value, ttl) {
        await this.cache.set(key, value, { ttl });
    }
};
SessionStore = __decorate([
    __param(0, (0, common_1.Inject)(common_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [Object, config_1.ConfigService])
], SessionStore);
exports.SessionStore = SessionStore;
class KeyNotFound extends Error {
    constructor() {
        super('token identifier does not match any record');
    }
}
exports.KeyNotFound = KeyNotFound;
//# sourceMappingURL=sessions.store.js.map