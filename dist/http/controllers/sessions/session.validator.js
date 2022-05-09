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
exports.LocationDTO = exports.CreateSessionDTO = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const constants_1 = require("../../../internal/constants");
class CreateSessionDTO {
    static _OPENAPI_METADATA_FACTORY() {
        return { first_name: { required: false, type: () => String }, last_name: { required: false, type: () => String }, email_address: { required: false, type: () => String }, phone_number: { required: false, type: () => String } };
    }
}
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateSessionDTO.prototype, "first_name", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateSessionDTO.prototype, "last_name", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], CreateSessionDTO.prototype, "email_address", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Matches)(constants_1.PHONE_NUMBER_REGEX, { message: constants_1.PHONE_NUMBER_REGEX_ERROR }),
    __metadata("design:type", String)
], CreateSessionDTO.prototype, "phone_number", void 0);
exports.CreateSessionDTO = CreateSessionDTO;
class LocationDTO {
    static _OPENAPI_METADATA_FACTORY() {
        return { lng: { required: true, type: () => Number }, lat: { required: true, type: () => Number } };
    }
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsLongitude)(),
    __metadata("design:type", Number)
], LocationDTO.prototype, "lng", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsLatitude)(),
    __metadata("design:type", Number)
], LocationDTO.prototype, "lat", void 0);
exports.LocationDTO = LocationDTO;
//# sourceMappingURL=session.validator.js.map