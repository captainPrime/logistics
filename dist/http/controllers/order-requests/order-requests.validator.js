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
exports.CreateOrderRequestDTO = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const orders_1 = require("../../../orders");
class CreateOrderRequestDTO {
    static _OPENAPI_METADATA_FACTORY() {
        return { sender_first_name: { required: true, type: () => String }, sender_last_name: { required: true, type: () => String }, sender_address: { required: true, type: () => String }, receiver_first_name: { required: true, type: () => String }, receiver_last_name: { required: true, type: () => String }, receiver_address: { required: true, type: () => String }, order_type: { required: true, enum: require("../../../orders/order.constants").ORDER_TYPE }, package_type: { required: true, type: () => String }, package_fragility: { required: true, enum: require("../../../orders/order.constants").PACKAGE_FRAGILITY }, package_minimum_size: { required: false, type: () => Number }, package_maximum_size: { required: true, type: () => Number }, pickup_point_lng: { required: true, type: () => Number }, pickup_point_lat: { required: true, type: () => Number }, delivery_point_lng: { required: true, type: () => Number }, delivery_point_lat: { required: true, type: () => Number } };
    }
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateOrderRequestDTO.prototype, "sender_first_name", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateOrderRequestDTO.prototype, "sender_last_name", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateOrderRequestDTO.prototype, "sender_address", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateOrderRequestDTO.prototype, "receiver_first_name", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateOrderRequestDTO.prototype, "receiver_last_name", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateOrderRequestDTO.prototype, "receiver_address", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsIn)(Object.values(orders_1.ORDER_TYPE)),
    __metadata("design:type", String)
], CreateOrderRequestDTO.prototype, "order_type", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateOrderRequestDTO.prototype, "package_type", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsIn)(Object.values(orders_1.PACKAGE_FRAGILITY)),
    __metadata("design:type", String)
], CreateOrderRequestDTO.prototype, "package_fragility", void 0);
__decorate([
    (0, class_validator_1.IsPositive)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateOrderRequestDTO.prototype, "package_minimum_size", void 0);
__decorate([
    (0, class_validator_1.IsPositive)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreateOrderRequestDTO.prototype, "package_maximum_size", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsLongitude)(),
    __metadata("design:type", Number)
], CreateOrderRequestDTO.prototype, "pickup_point_lng", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsLatitude)(),
    __metadata("design:type", Number)
], CreateOrderRequestDTO.prototype, "pickup_point_lat", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsLongitude)(),
    __metadata("design:type", Number)
], CreateOrderRequestDTO.prototype, "delivery_point_lng", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsLatitude)(),
    __metadata("design:type", Number)
], CreateOrderRequestDTO.prototype, "delivery_point_lat", void 0);
exports.CreateOrderRequestDTO = CreateOrderRequestDTO;
//# sourceMappingURL=order-requests.validator.js.map