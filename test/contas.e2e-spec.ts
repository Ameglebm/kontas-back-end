import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Contas (e2e)', () => {
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

  it('POST /contas → 401', () => {
    return request(app.getHttpServer())
      .post('/contas')
      .send({
        descricao: 'Conta teste',
        valor: 100,
        vencimento: '2026-12-10',
        republicaId: 'fake-id',
      })
      .expect(401);
  });

  it('GET /contas/republica/:id → 401', () => {
    return request(app.getHttpServer())
      .get('/contas/republica/fake-id')
      .expect(401);
  });
});
