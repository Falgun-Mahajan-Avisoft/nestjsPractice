import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { HostControllerController } from './host-controller/host-controller.controller';
import { ProductsModule } from './products/products.module';
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
    }
  ],
})
export class AppModule {}
