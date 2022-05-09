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
exports.ORDER_REQUEST_STATUS = exports.OrderRequest = void 0;
const openapi = require("@nestjs/swagger");
const model_1 = require("../internal/model");
const orders_1 = require("../orders");
const typeorm_1 = require("typeorm");
const users_1 = require("../users");
let OrderRequest = class OrderRequest extends model_1.Model {
    static _OPENAPI_METADATA_FACTORY() {
        return { user: { required: true, type: () => require("../users/user.model").User, description: "User making the request" }, sender_details: { required: true, type: () => String, description: "JSON data of sender of package" }, recipient_details: { required: true, type: () => String, description: "JSON data of recipient of package" }, order_type: { required: true, description: "type of order request user wants to make: could be go box or go send", enum: require("../orders/order.constants").ORDER_TYPE }, package_type: { required: true, type: () => String, description: "type of package to be delivered by user" }, package_fragility: { required: true, description: "package fragility specification", enum: require("../orders/order.constants").PACKAGE_FRAGILITY }, package_minimum_size: { required: true, type: () => Number, description: "minimum package size in Kg" }, package_maximum_size: { required: true, type: () => Number, description: "maximum package size in Kg" }, pickup_point: { required: true, type: () => Object, description: "pickup location: to be used to search for hoppers" }, delivery_point: { required: true, type: () => Object, description: "pickup location: to be used to search for hoppers" }, status: { required: true, enum: require("./order-request.model").ORDER_REQUEST_STATUS } };
    }
};
__decorate([
    (0, typeorm_1.ManyToOne)(() => users_1.User),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", users_1.User)
], OrderRequest.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json' }),
    __metadata("design:type", String)
], OrderRequest.prototype, "sender_details", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json' }),
    __metadata("design:type", String)
], OrderRequest.prototype, "recipient_details", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], OrderRequest.prototype, "order_type", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], OrderRequest.prototype, "package_type", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], OrderRequest.prototype, "package_fragility", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, unsigned: true, type: 'decimal' }),
    __metadata("design:type", Number)
], OrderRequest.prototype, "package_minimum_size", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, unsigned: true, type: 'decimal' }),
    __metadata("design:type", Number)
], OrderRequest.prototype, "package_maximum_size", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'geometry',
        spatialFeatureType: 'Point',
        srid: 4326,
    }),
    __metadata("design:type", Object)
], OrderRequest.prototype, "pickup_point", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'geometry',
        spatialFeatureType: 'Point',
        srid: 4326,
    }),
    __metadata("design:type", Object)
], OrderRequest.prototype, "delivery_point", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], OrderRequest.prototype, "status", void 0);
OrderRequest = __decorate([
    (0, typeorm_1.Entity)({ name: 'order_requests' })
], OrderRequest);
exports.OrderRequest = OrderRequest;
var ORDER_REQUEST_STATUS;
(function (ORDER_REQUEST_STATUS) {
    ORDER_REQUEST_STATUS["CREATED"] = "created";
    ORDER_REQUEST_STATUS["ACCEPTED"] = "accepted";
    ORDER_REQUEST_STATUS["ORDERED"] = "ordered";
})(ORDER_REQUEST_STATUS = exports.ORDER_REQUEST_STATUS || (exports.ORDER_REQUEST_STATUS = {}));
//# sourceMappingURL=order-request.model.js.map