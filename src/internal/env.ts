import * as joi from 'joi';

import { Env } from '@app/config/env.keys';

const special_cases = {
  [Env.port]: joi.number().required(),
  [Env.redis_url]: joi
    .string()
    .uri({ scheme: ['redis'] })
    .trim()
    .required(),
};

export function get_schema() {
  const schema = {};
  const default_validation = joi.string().required();

  for (const key in Env) {
    const value = Env[key];

    schema[value.toUpperCase()] = special_cases[value] ?? default_validation;
  }

  return joi.object().keys(schema);
}
