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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocationQueueConsumer = void 0;
const queue_1 = require("../../internal/queue");
const bull_1 = require("bull");
const bull_2 = require("@nestjs/bull");
const hoppers_1 = require("../../hoppers");
let LocationQueueConsumer = class LocationQueueConsumer {
    constructor(hoppersRepo) {
        this.hoppersRepo = hoppersRepo;
    }
    async update(job) {
        const { user_id, location } = job.data;
        await this.hoppersRepo.query(`update hoppers set location=ST_MAKEPOINT(${location[0]},${location[1]}) where user_id='${user_id}'`);
    }
};
__decorate([
    (0, bull_2.Process)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = typeof bull_1.Job !== "undefined" && bull_1.Job) === "function" ? _a : Object]),
    __metadata("design:returntype", Promise)
], LocationQueueConsumer.prototype, "update", null);
LocationQueueConsumer = __decorate([
    (0, bull_2.Processor)(queue_1.QUEUE.LOCATION),
    __metadata("design:paramtypes", [hoppers_1.HopperRepo])
], LocationQueueConsumer);
exports.LocationQueueConsumer = LocationQueueConsumer;
//# sourceMappingURL=location.consumer.js.map