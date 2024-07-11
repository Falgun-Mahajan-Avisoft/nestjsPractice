import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { writeFile } from 'fs/promises';
import { join } from 'path';
@Catch()
export class AppExceptionFilter implements ExceptionFilter {
  constructor(private httpAdapterHost: HttpAdapterHost) {}
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let msg = 'Internal Server Error';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      msg = exception.message;
    }
    const { httpAdapter } = this.httpAdapterHost;
    const body = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      message: msg,
    };
    this.writeHttpLog(body);
    httpAdapter.reply(ctx.getResponse(),body,status)
  }
  private async writeHttpLog(data: Record<string, any>) {
    const Logs_Dir = join(__dirname, `${Date.now()}-log.json`);
    try {
      await writeFile(Logs_Dir, JSON.stringify(data));
    } catch (error) {
      return;
    }
  }
}
