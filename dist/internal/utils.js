"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Helper_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Helper = void 0;
const common_1 = require("@nestjs/common");
let Helper = Helper_1 = class Helper {
    static get phone_number_regex() {
        return Helper_1._phone_number_regex;
    }
    format_phone_number(num) {
        let index;
        if (num[0] == '0')
            index = 1;
        if (/234/.test(num))
            index = 0;
        if (/\+234/.test(num))
            index = 4;
        return '+234' + num.slice(index);
    }
    get_user_session(res) {
        return res.locals.session;
    }
};
Helper._phone_number_regex = /^(0|\+?2340?)[0-9][01]\d{8}$/;
Helper = Helper_1 = __decorate([
    (0, common_1.Injectable)()
], Helper);
exports.Helper = Helper;
//# sourceMappingURL=utils.js.map