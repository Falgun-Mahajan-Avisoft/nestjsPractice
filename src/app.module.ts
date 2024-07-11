import { BeforeApplicationShutdown, MiddlewareConsumer, Module, NestModule, OnApplicationBootstrap, OnApplicationShutdown, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { HostControllerController } from './host-controller/host-controller.controller';
import { ProductsModule } from './products/products.module';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { AppExceptionFilter } from './exceptions/AppException.filter';
import { AuthMiddleware } from './middlewares/Auth.middleware';
import { LoggerInterceptor } from './products/Interceptors/logger.interceptor';
function createConnection(options = {}) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        message: "CONNECTED",
        options,
      });
    }, 5000);
  });
}
@Module({
  imports: [ProductsModule],
  controllers: [
    AppController,
    UsersController,
    HostControllerController,
  ],
  providers: [
    AppService,

    { provide: 'Database_Name', useValue: 'Products' },
    { provide: 'mail', useValue: ['abc@gmail.com', 'xyz@gmail.com'] },
    {
      provide: 'env_config',
      useValue: {
        type: 'dev',
        node: '17',
      },
    },
    // {
    //   provide: 'Database_Connection',
    //   useFactory: async (options) => {
    //     const connection = await createConnection(options);
    //     return connection;
    //   },
    //   inject: ["DB_Options"],
    // },
    {
      provide:"DB_Options",
      useValue:{url:'', user:'', password:''}
    },
    // {
    //   provide:APP_FILTER,useClass:AppExceptionFilter
    // }
    // {
    //   provide:APP_INTERCEPTOR,useClass:LoggerInterceptor
    // }
  ],
})
export class AppModule implements OnApplicationBootstrap,BeforeApplicationShutdown,OnApplicationShutdown , NestModule {
  onApplicationBootstrap() {
    console.log("Application bootstrap")
}
beforeApplicationShutdown(signal?: string) {
    console.log("Before Application shutdown",signal)
}
onApplicationShutdown(signal?: string) {
  console.log("on Application shutdown",signal)
}
configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes("*")
}
}

