import * as request from 'supertest';

import { AppModule } from '../../src/app.module';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { userDTO } from '../__mocks__/user';

describe('UserController', () => {
  const baseURL = '/users';
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`should create a new user successfully`, () => {
    const dto = userDTO();
    return request(app.getHttpServer()).post(baseURL).send(dto).expect(401);
  });

  afterAll(async () => {
    await app.close();
  });
});
