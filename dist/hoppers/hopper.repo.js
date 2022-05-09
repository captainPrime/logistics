"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidHopperStatusMove = exports.HopperNotFound = exports.DuplicateHopper = exports.HopperRepo = void 0;
const db_1 = require("../internal/db");
const typeorm_1 = require("typeorm");
const hopper_model_1 = require("./hopper.model");
let HopperRepo = class HopperRepo extends typeorm_1.Repository {
    async create_hopper(user, status = hopper_model_1.HOPPER_STATUS.APPLIED) {
        try {
            const hopper = new hopper_model_1.Hopper();
            hopper.user = user;
            hopper.status = status;
            return await this.save(hopper);
        }
        catch (err) {
            if (err.code == db_1.DB_ERROR_CODES.DUPLICATE) {
                throw new DuplicateHopper();
            }
        }
    }
    async get_hopper(id) {
        const hopper = await this.findOne(id, { relations: ['user'] });
        if (!hopper)
            throw new HopperNotFound();
        return hopper;
    }
    async get_hopper_by_user(user) {
        const hopper = await this.findOne({ user }, { relations: ['user'] });
        if (!hopper)
            throw new HopperNotFound();
        return hopper;
    }
    async update_hopper_status(hopper, status) {
        const hopper_status_map = {
            [hopper_model_1.HOPPER_STATUS.APPLIED]: {
                [hopper_model_1.HOPPER_STATUS.DECLINED]: true,
                [hopper_model_1.HOPPER_STATUS.IDLE]: true,
            },
            [hopper_model_1.HOPPER_STATUS.DECLINED]: {
                [hopper_model_1.HOPPER_STATUS.APPLIED]: true,
            },
        };
        const valid_move = hopper_status_map[hopper.status] &&
            hopper_status_map[hopper.status][status];
        if (!valid_move)
            throw new InvalidHopperStatusMove();
        hopper.status = status;
        return await this.save(hopper);
    }
};
HopperRepo = __decorate([
    (0, typeorm_1.EntityRepository)(hopper_model_1.Hopper)
], HopperRepo);
exports.HopperRepo = HopperRepo;
class DuplicateHopper extends Error {
    constructor() {
        super('You have already applied to be a hopper. you can only reapply and not create a new application.');
    }
}
exports.DuplicateHopper = DuplicateHopper;
class HopperNotFound extends Error {
    constructor() {
        super('The provided hopper identifier does not match any of our records.');
    }
}
exports.HopperNotFound = HopperNotFound;
class InvalidHopperStatusMove extends Error {
    constructor() {
        super('Invalid hopper status change.');
    }
}
exports.InvalidHopperStatusMove = InvalidHopperStatusMove;
//# sourceMappingURL=hopper.repo.js.map