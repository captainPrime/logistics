"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MINIMUM_AMOUNT = exports.CURRENCY = exports.TRANSACTION_PROVIDERS = exports.TRANSACTION_STATUS = exports.TRANSACTION_TYPES = exports.TRANSACTION_INTENTS = void 0;
var TRANSACTION_INTENTS;
(function (TRANSACTION_INTENTS) {
    TRANSACTION_INTENTS["WALLET_FUNDING"] = "wallet funding";
    TRANSACTION_INTENTS["WITHDRAWAL"] = "withdrawal";
})(TRANSACTION_INTENTS = exports.TRANSACTION_INTENTS || (exports.TRANSACTION_INTENTS = {}));
var TRANSACTION_TYPES;
(function (TRANSACTION_TYPES) {
    TRANSACTION_TYPES["CREDIT"] = "credit";
    TRANSACTION_TYPES["DEBIT"] = "debit";
})(TRANSACTION_TYPES = exports.TRANSACTION_TYPES || (exports.TRANSACTION_TYPES = {}));
var TRANSACTION_STATUS;
(function (TRANSACTION_STATUS) {
    TRANSACTION_STATUS["INITIATED"] = "initiated";
    TRANSACTION_STATUS["PENDING"] = "pending";
    TRANSACTION_STATUS["SUCCESSFUL"] = "successful";
    TRANSACTION_STATUS["CANCELED"] = "canceled";
    TRANSACTION_STATUS["FAILED"] = "failed";
})(TRANSACTION_STATUS = exports.TRANSACTION_STATUS || (exports.TRANSACTION_STATUS = {}));
var TRANSACTION_PROVIDERS;
(function (TRANSACTION_PROVIDERS) {
    TRANSACTION_PROVIDERS["PAYSTACK"] = "paystack";
})(TRANSACTION_PROVIDERS = exports.TRANSACTION_PROVIDERS || (exports.TRANSACTION_PROVIDERS = {}));
var CURRENCY;
(function (CURRENCY) {
    CURRENCY["NAIRA"] = "NGN";
})(CURRENCY = exports.CURRENCY || (exports.CURRENCY = {}));
exports.MINIMUM_AMOUNT = 500.0;
//# sourceMappingURL=transaction.constant.js.map