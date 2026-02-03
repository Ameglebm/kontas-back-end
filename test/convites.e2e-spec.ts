import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Convites (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('POST /convites → 401', () => {
    return request(app.getHttpServer())
      .post('/convites')
      .send({
        email: 'teste@email.com',
        republicaId: 'fake-id',
      })
      .expect(401);
  });

  it('GET /convites/me → 401', () => {
    return request(app.getHttpServer())
      .get('/convites/me')
      .expect(401);
  });
});
