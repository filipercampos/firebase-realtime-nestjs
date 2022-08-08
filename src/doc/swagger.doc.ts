import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
/**
 * Create swagger docs
 */
export function swaggerDocs(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('API Firebase Realtime Database')
    .setDescription('The firebase realtime sample')
    .setVersion('1.0')
    .addTag('cards', 'Cards title')
    .addTag('tasks', 'Tasks to do')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/docs', app, document);
}
