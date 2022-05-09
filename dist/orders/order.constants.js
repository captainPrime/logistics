"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PACKAGE_FRAGILITY = exports.ORDER_TYPE = exports.ORDER_STATUS = void 0;
var ORDER_STATUS;
(function (ORDER_STATUS) {
    ORDER_STATUS["COLLECTED"] = "collected";
    ORDER_STATUS["COURIER_PREPARING"] = "courier preparing";
})(ORDER_STATUS = exports.ORDER_STATUS || (exports.ORDER_STATUS = {}));
var ORDER_TYPE;
(function (ORDER_TYPE) {
    ORDER_TYPE["GO_BOX"] = "go box";
    ORDER_TYPE["GO_SEND"] = "go send";
})(ORDER_TYPE = exports.ORDER_TYPE || (exports.ORDER_TYPE = {}));
var PACKAGE_FRAGILITY;
(function (PACKAGE_FRAGILITY) {
    PACKAGE_FRAGILITY["SHATTER_RESISTANT"] = "shatter resistant";
    PACKAGE_FRAGILITY["EASILY_BROKEN"] = "easily broken";
})(PACKAGE_FRAGILITY = exports.PACKAGE_FRAGILITY || (exports.PACKAGE_FRAGILITY = {}));
//# sourceMappingURL=order.constants.js.map