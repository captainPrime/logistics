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
exports.AllExceptionsFilter = exports.UnauthorizedRequest = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
class UnauthorizedRequest extends common_1.UnauthorizedException {
    constructor(message) {
        super(message !== null && message !== void 0 ? message : 'We could not find a session for your request');
    }
}
exports.UnauthorizedRequest = UnauthorizedRequest;
let AllExceptionsFilter = class AllExceptionsFilter {
    constructor(httpAdapterHost) {
        this.httpAdapterHost = httpAdapterHost;
    }
    catch(exception, host) {
        const { httpAdapter } = this.httpAdapterHost;
        const ctx = host.switchToHttp();
        const res = ctx.getResponse();
        let httpStatus;
        let message;
        if (exception instanceof common_1.HttpException) {
            httpStatus = exception.getStatus();
            const error = exception.getResponse();
            message =
                typeof error == 'string'
                    ? error
                    : typeof error['message'] == 'string'
                        ? error['message']
                        : error['message'][0];
        }
        else {
            common_1.Logger.error(exception, 'SYSTEM ERROR');
            console.log(exception);
            httpStatus = common_1.HttpStatus.INTERNAL_SERVER_ERROR;
            message = 'We are having system level issues. Do bear with us';
        }
        httpAdapter.reply(res, { message }, httpStatus);
    }
};
AllExceptionsFilter = __decorate([
    (0, common_1.Catch)(),
    __metadata("design:paramtypes", [core_1.HttpAdapterHost])
], AllExceptionsFilter);
exports.AllExceptionsFilter = AllExceptionsFilter;
//# sourceMappingURL=errors.js.map