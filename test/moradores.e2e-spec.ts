import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Moradores (e2e)', () => {
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

  it('POST /moradores → 401 sem autenticação', () => {
    return request(app.getHttpServer())
      .post('/moradores')
      .send({
        usuarioId: 'fake',
        republicaId: 'fake',
        papel: 'MORADOR',
      })
      .expect(401);
  });

  it('GET /moradores/republica/:id → 401', () => {
    return request(app.getHttpServer())
      .get('/moradores/republica/uuid-fake')
      .expect(401);
  });
});
