import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';

describe('RepublicaController (e2e)', () => {
  let app: INestApplication;
  let token: string;
  let republicaId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    // ⚠️ token fake apenas para testar AUTH GUARD
    token = 'Bearer token-fake';
  });

  afterAll(async () => {
    await app.close();
  });

  // 🔒 CREATE
  it('POST /republicas → 401 sem token', async () => {
    await request(app.getHttpServer())
      .post('/republicas')
      .send({ nome: 'Rep Teste' })
      .expect(401);
  });

  it('POST /republicas → 400 sem body', async () => {
    await request(app.getHttpServer())
      .post('/republicas')
      .set('Authorization', token)
      .send({})
      .expect(400);
  });

  // 📄 LIST
  it('GET /republicas → 401 sem token', async () => {
    await request(app.getHttpServer())
      .get('/republicas')
      .expect(401);
  });

  // 🔍 FIND BY ID
  it('GET /republicas/:id → 401 sem token', async () => {
    await request(app.getHttpServer())
      .get('/republicas/uuid-fake')
      .expect(401);
  });

  it('GET /republicas/:id → 404 inexistente', async () => {
    await request(app.getHttpServer())
      .get('/republicas/uuid-inexistente')
      .set('Authorization', token)
      .expect(404);
  });

  // ✏️ UPDATE
  it('PATCH /republicas/:id → 401 sem token', async () => {
    await request(app.getHttpServer())
      .patch('/republicas/uuid')
      .send({ nome: 'Novo Nome' })
      .expect(401);
  });

  // ❌ DELETE
  it('DELETE /republicas/:id → 401 sem token', async () => {
    await request(app.getHttpServer())
      .delete('/republicas/uuid')
      .expect(401);
  });
});
