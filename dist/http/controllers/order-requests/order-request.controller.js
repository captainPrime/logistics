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
exports.OrderRequestController = void 0;
const openapi = require("@nestjs/swagger");
const middlewares_1 = require("../../middlewares");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const order_request_model_1 = require("../../../order-requests/order-request.model");
const order_request_repo_1 = require("../../../order-requests/order-request.repo");
const session_validator_1 = require("../sessions/session.validator");
const order_requests_validator_1 = require("./order-requests.validator");
let OrderRequestController = class OrderRequestController {
    constructor(orderRequestRepo) {
        this.orderRequestRepo = orderRequestRepo;
    }
    async create_order_request({ user }, dto) {
        const sender = {
            first_name: dto.sender_first_name,
            last_name: dto.sender_last_name,
            address: dto.sender_address,
        };
        const receiver = {
            first_name: dto.receiver_first_name,
            last_name: dto.receiver_last_name,
            address: dto.receiver_address,
        };
        const order_request = new order_request_model_1.OrderRequest();
        order_request.user = user;
        order_request.sender_details = JSON.stringify(sender);
        order_request.recipient_details = JSON.stringify(receiver);
        order_request.package_type = dto.package_type;
        order_request.package_fragility = dto.package_fragility;
        order_request.package_minimum_size = dto.package_minimum_size;
        order_request.package_maximum_size = dto.package_maximum_size;
        order_request.status = order_request_model_1.ORDER_REQUEST_STATUS.CREATED;
        order_request.pickup_point = {
            type: 'Point',
            coordinates: [dto.pickup_point_lng, dto.pickup_point_lat],
        };
        order_request.delivery_point = {
            type: 'Point',
            coordinates: [dto.delivery_point_lng, dto.delivery_point_lat],
        };
        order_request.order_type = dto.order_type;
        return await this.orderRequestRepo.save(order_request);
    }
    async get_order_requests(query) {
        const origin = {
            type: 'Point',
            coordinates: [query.lng, query.lat],
        };
        const orderRequests = await this.orderRequestRepo
            .createQueryBuilder()
            .where('ST_DWithin(pickup_point, ST_GeomFromGeoJSON(:origin), 5)')
            .orderBy({
            'ST_Distance(pickup_point, ST_GeomFromGeoJSON(:origin))': {
                order: 'ASC',
                nulls: 'NULLS FIRST',
            },
        })
            .setParameters({ origin: JSON.stringify(origin) })
            .getMany();
        return orderRequests;
    }
};
__decorate([
    (0, common_1.Post)('/'),
    openapi.ApiResponse({ status: 201, type: require("../../../order-requests/order-request.model").OrderRequest }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, order_requests_validator_1.CreateOrderRequestDTO]),
    __metadata("design:returntype", Promise)
], OrderRequestController.prototype, "create_order_request", null);
__decorate([
    (0, common_1.Get)('/'),
    openapi.ApiResponse({ status: 200, type: [require("../../../order-requests/order-request.model").OrderRequest] }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [session_validator_1.LocationDTO]),
    __metadata("design:returntype", Promise)
], OrderRequestController.prototype, "get_order_requests", null);
OrderRequestController = __decorate([
    (0, swagger_1.ApiTags)('Order Requests'),
    (0, common_1.UseGuards)(middlewares_1.AuthGuard),
    (0, common_1.Controller)('order-requests'),
    __metadata("design:paramtypes", [order_request_repo_1.OrderRequestRepo])
], OrderRequestController);
exports.OrderRequestController = OrderRequestController;
//# sourceMappingURL=order-request.controller.js.map