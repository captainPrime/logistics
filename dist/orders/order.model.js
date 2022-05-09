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
exports.Order = void 0;
const openapi = require("@nestjs/swagger");
const model_1 = require("../internal/model");
const hoppers_1 = require("../hoppers");
const typeorm_1 = require("typeorm");
const users_1 = require("../users");
const order_constants_1 = require("./order.constants");
let Order = class Order extends model_1.Model {
    static _OPENAPI_METADATA_FACTORY() {
        return { user: { required: true, type: () => require("../users/user.model").User, description: "User making the order request" }, hopper: { required: true, type: () => require("../hoppers/hopper.model").Hopper, description: "Hopper who has decided to handle the order" }, status: { required: true, description: "status of the order", enum: require("./order.constants").ORDER_STATUS }, current_location: { required: true, type: () => Object, description: "current location of order for tracking purposes" }, pickup_time: { required: true, type: () => Date, description: "delivery time" }, delivery_time: { required: true, type: () => Date, description: "time hopper delivered the package" } };
    }
};
__decorate([
    (0, typeorm_1.ManyToOne)(() => users_1.User, (u) => u.orders),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", users_1.User)
], Order.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => hoppers_1.Hopper),
    (0, typeorm_1.JoinColumn)({ name: 'hopper_id' }),
    __metadata("design:type", hoppers_1.Hopper)
], Order.prototype, "hopper", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Order.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'geometry',
        spatialFeatureType: 'Point',
        srid: 4326,
    }),
    __metadata("design:type", Object)
], Order.prototype, "current_location", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], Order.prototype, "pickup_time", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], Order.prototype, "delivery_time", void 0);
Order = __decorate([
    (0, typeorm_1.Entity)({ name: 'orders' })
], Order);
exports.Order = Order;
//# sourceMappingURL=order.model.js.map