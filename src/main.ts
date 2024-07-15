import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppExceptionFilter } from './exceptions/AppException.filter';
import { LoggerInterceptor } from './products/Interceptors/logger.interceptor';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // const httpAdapterHost = app.get(HttpAdapterHost)
  // app.useGlobalFilters(new AppExceptionFilter(httpAdapterHost))
  const configService = app.get(ConfigService)
  const port = configService.get<number>("APP_PORT")
  app.useGlobalInterceptors(new LoggerInterceptor())
  await app.listen(port);
  app.enableShutdownHooks()
}
bootstrap();
