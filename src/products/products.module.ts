import { Global, MiddlewareConsumer, Module, NestModule, OnApplicationBootstrap, OnModuleDestroy, OnModuleInit, RequestMethod } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { AppModule } from 'src/app.module';
import { ParseDateOptions } from './parseDate.pipe';
import { userAgent, UserAgentMiddleware, UserAgentOptions } from 'src/middlewares/user-agent.middleware';
import { AuthMiddleware } from 'src/middlewares/Auth.middleware';
import { RecentSearchProduct } from './recent-search.service';
@Global()
@Module({
    imports:[],
    controllers:[ProductsController],
    providers:[ProductsService,RecentSearchProduct,
        {
        provide:ParseDateOptions,
        useValue:{
            fromTimeStamp:true,
            errorMsg:"Data Transformation failed"
        }
    },

        {
            provide:UserAgentOptions,
            useValue :{accepted: ["chrome","firefox","postman"]},
        }
],
    exports:[ProductsService]
})
export class ProductsModule implements OnModuleInit,OnModuleDestroy, NestModule {
    onModuleInit() {
        console.log("Products Module init")
    }
   
    onModuleDestroy() {
        console.log("Module Destroyed");
        
    }

    configure(consumer: MiddlewareConsumer) {
        consumer.apply(UserAgentMiddleware).exclude({path:"/products",method:RequestMethod.POST}).forRoutes("products")
    }
}
