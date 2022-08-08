import { Logger } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { firebaseInit } from './config/firebase.config';
import { swaggerDocs } from './doc/swagger.doc';
import { FilterException } from './interceptors/filter.exception';
const logger = new Logger('main');
async function bootstrap() {
  await firebaseInit();
  const app = await NestFactory.create(AppModule);
  swaggerDocs(app);
  const httpAdapter = app.get(HttpAdapterHost);
  app.useGlobalFilters(new FilterException(httpAdapter));
  app
    .listen(process.env.PORT)
    .then(() =>
      logger.log(
        `API running env ${process.env.ENV} on port ${process.env.PORT}`,
      ),
    );
}
bootstrap();
