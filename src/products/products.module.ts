import { Global, Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { AppModule } from 'src/app.module';
import { ParseDateOptions } from './parseDate.pipe';
@Global()
@Module({
    imports:[],
    controllers:[ProductsController],
    providers:[ProductsService,
        {
        provide:ParseDateOptions,
        useValue:{
            fromTimeStamp:true,
            errorMsg:"Data Transformation failed"
        }
    }
],
    exports:[ProductsService]
})
export class ProductsModule {}
