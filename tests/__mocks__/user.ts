import * as faker from 'faker';

import { NestExpressApplication } from '@nestjs/platform-express';
import { UserDTO } from '../../src/http/controllers/users/user.validator';
import { UserRepo } from '../../src/users/user.repo';

export async function create_user(
  app: NestExpressApplication,
  dto = userDTO(),
) {
  const repo = app.get(UserRepo);
  return await repo.create_user(dto);
}

export function userDTO() {
  return {
    email_address: faker.internet.email(),
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    phone_number: faker.phone.phoneFormats(),
  } as UserDTO;
}
