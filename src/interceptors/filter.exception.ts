import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { FirebaseException } from './../data/exceptions/firebase.exception';
/**
 * Globa filter exception
 */
@Catch()
export class FilterException implements ExceptionFilter {
  private logger: Logger = new Logger(FilterException.name);
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    // In certain situations `httpAdapter` might not be available in the
    // constructor method, thus we should resolve it here.
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    let message = exception['message'];

    if (
      !(exception instanceof FirebaseException) &&
      httpStatus == HttpStatus.INTERNAL_SERVER_ERROR
    ) {
      message = 'Falha interna';
      this.logger.error(message);
    }

    const responseBody = {
      code: httpStatus,
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
      message: message,
    };
    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
