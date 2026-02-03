import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';

describe('AuthController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('POST /auth/google → 400 sem token google', async () => {
    await request(app.getHttpServer())
      .post('/auth/google')
      .send({})
      .expect(400);
  });

  it('POST /auth/completar-dados → 401 sem token', async () => {
    await request(app.getHttpServer())
      .post('/auth/completar-dados')
      .send({ nome: 'Teste' })
      .expect(401);
  });
});
