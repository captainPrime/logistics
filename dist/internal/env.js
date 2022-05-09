"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.get_schema = void 0;
const joi = require("joi");
const env_keys_1 = require("../config/env.keys");
const special_cases = {
    [env_keys_1.Env.port]: joi.number().required(),
    [env_keys_1.Env.redis_url]: joi
        .string()
        .uri({ scheme: ['redis'] })
        .trim()
        .required(),
    [env_keys_1.Env.paystack_account_email]: joi.string().email().required(),
};
function get_schema() {
    var _a;
    const schema = {};
    const default_validation = joi.string().required();
    for (const key in env_keys_1.Env) {
        const value = env_keys_1.Env[key];
        schema[value.toUpperCase()] = (_a = special_cases[value]) !== null && _a !== void 0 ? _a : default_validation;
    }
    return joi.object().keys(schema);
}
exports.get_schema = get_schema;
//# sourceMappingURL=env.js.map