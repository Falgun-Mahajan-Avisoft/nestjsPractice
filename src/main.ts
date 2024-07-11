import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppExceptionFilter } from './exceptions/AppException.filter';
import { LoggerInterceptor } from './products/Interceptors/logger.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // const httpAdapterHost = app.get(HttpAdapterHost)
  // app.useGlobalFilters(new AppExceptionFilter(httpAdapterHost))
  app.useGlobalInterceptors(new LoggerInterceptor())
  await app.listen(3000);
  app.enableShutdownHooks()
}
bootstrap();
