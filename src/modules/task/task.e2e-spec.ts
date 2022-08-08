import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../../app.module';
import { firebaseInit } from '../../config/firebase.config';

describe('TaskController (e2e)', () => {
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

  it('/tasks (POST)', async () => {
    const data = {
      name: 'Task 1',
      description: 'Create something',
    };
    await request(app.getHttpServer())
      .post('/tasks')
      .send(data)
      .expect(201)
      .then((value: any) => {
        save = value.body;
      });
  });

  it('/tasks (GET) id', () => {
    const id = save.id;
    return request(app.getHttpServer())
      .get('/tasks/' + id)
      .expect(200);
  });

  it('/tasks (GET)', () => {
    return request(app.getHttpServer()).get('/tasks').expect(200);
  });

  it('/tasks (DELETE)', () => {
    const id = save.id;
    return request(app.getHttpServer())
      .delete('/tasks/' + id)
      .expect(200);
  });

  afterAll(() => {
    app.close();
  });
});
