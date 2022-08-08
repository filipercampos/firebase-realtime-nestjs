import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../../app.module';
import { firebaseInit } from '../../config/firebase.config';

describe('CardController (e2e)', () => {
  let app: INestApplication;
  let save: any;
  beforeEach(async () => {
    await firebaseInit();

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/cards (POST)', async () => {
    const data = {
      id: 1,
      name: 'Card 1',
      description: 'Cart title',
    };
    await request(app.getHttpServer())
      .post('/cards')
      .send(data)
      .expect(201)
      .then((value: any) => {
        save = value.body;
      });
  });

  it('/cards (GET) id', () => {
    const id = save.id;
    return request(app.getHttpServer())
      .get('/cards/' + id)
      .expect(200);
  });

  it('/cards (GET)', () => {
    return request(app.getHttpServer()).get('/cards').expect(200);
  });

  it('/cards (DELETE)', () => {
    const id = 1;
    return request(app.getHttpServer())
      .delete('/cards/' + id)
      .expect(200);
  });

  afterAll(() => {
    app.close();
  });
});
