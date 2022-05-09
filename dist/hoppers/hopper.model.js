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
exports.HOPPER_STATUS = exports.Hopper = void 0;
const openapi = require("@nestjs/swagger");
const model_1 = require("../internal/model");
const typeorm_1 = require("typeorm");
const user_model_1 = require("../users/user.model");
let Hopper = class Hopper extends model_1.Model {
    static _OPENAPI_METADATA_FACTORY() {
        return { status: { required: true, description: "Hopper's status", enum: require("./hopper.model").HOPPER_STATUS }, location: { required: true, type: () => Object, description: "Hopper's current location... to be updated frequently" }, user: { required: true, type: () => require("../users/user.model").User } };
    }
};
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Hopper.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'geometry',
        spatialFeatureType: 'Point',
        nullable: true,
        srid: 4326,
    }),
    __metadata("design:type", Object)
], Hopper.prototype, "location", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => user_model_1.User),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", user_model_1.User)
], Hopper.prototype, "user", void 0);
Hopper = __decorate([
    (0, typeorm_1.Entity)({ name: 'hoppers' })
], Hopper);
exports.Hopper = Hopper;
var HOPPER_STATUS;
(function (HOPPER_STATUS) {
    HOPPER_STATUS["APPLIED"] = "applied";
    HOPPER_STATUS["HOPPING"] = "hopping";
    HOPPER_STATUS["IDLE"] = "idle";
    HOPPER_STATUS["BOOKED"] = "booked";
    HOPPER_STATUS["DECLINED"] = "declined";
})(HOPPER_STATUS = exports.HOPPER_STATUS || (exports.HOPPER_STATUS = {}));
//# sourceMappingURL=hopper.model.js.map