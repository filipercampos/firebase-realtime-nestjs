import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { FilterException } from './interceptors/filter.exception';
import { CardModule, TaskModule } from './modules';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['local.env', '.env'],
    }),
    CardModule,
    TaskModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: FilterException,
    },
  ],
})
export class AppModule {}
