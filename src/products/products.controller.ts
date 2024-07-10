import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  ForbiddenException,
  GatewayTimeoutException,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  InternalServerErrorException,
  Ip,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UnauthorizedException,
  UseFilters,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { createProductsDTO } from './DTO/ProductsDTO';
import { ProductsService } from './products.service';
import { timestamp } from 'rxjs';
import { ParseDatePipe } from './parseDate.pipe';
import { joiValidationPipe } from './DTO/joiValidation.pipe';
import { productSchema } from './DTO/productsSchema';
import { IdException } from 'src/exceptions/idExceptions';
import { IdExceptionFilter } from 'src/exceptions/idException.filter';
import { HttpExceptionFilter } from 'src/exceptions/httpException.filter';
@Controller('products')
@UseFilters(HttpExceptionFilter)
export class ProductsController {
  constructor(
    private productService: ProductsService,
    // @Inject('Database_Name') private dbname: string,
    // @Inject('mail') private mails: string[],
    // @Inject('env_config') private config: Record<string,any> ,
    // @Inject('Database_Connection') private connection: any ,
  ) {}
  // @Post()
  // @UsePipes(new joiValidationPipe(productSchema))
  // create(@Body() createProductsDto: createProductsDTO) {
  //   return this.productService.createProducts(createProductsDto);
  // }
  @Post()
  
  create(@Body(new ValidationPipe({stopAtFirstError:true})) createProductsDto: createProductsDTO) {
    return this.productService.createProducts(createProductsDto);
  }

  @Post('/timestamps')
  createTimestamp(@Body(ParseDatePipe) date:Date){
    return date;
  }

  @Get()
  findAll(@Ip() ip: string) {
    console.log(ip);
    return this.productService.getAllProducts();
  }
  @Get('/:id')
  @UseFilters(IdExceptionFilter)
  findOne(@Param('id',new ParseIntPipe({errorHttpStatusCode:HttpStatus.NOT_ACCEPTABLE})) id: number) {
    if(id<=0){
      // throw new IdException();
      // throw new InternalServerErrorException()
      // throw new GatewayTimeoutException()
      // throw new ForbiddenException()
      // throw new UnauthorizedException()
      // throw new NotFoundException()
      // throw new BadRequestException({
      //   error:"invalid id",
      //   message:"Id must be higher than 0"
      // })
      throw new BadRequestException("Id must be higher than 0", "id is not valid")
      // throw new HttpException({error:'invalid id', message:"Id must be greater than 0"},400)
    }
    return this.productService.getProduct(id);
  }
  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateProductsDto: createProductsDTO,
  ) {
    return this.productService.updateProduct(+id, updateProductsDto);
  }
  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.productService.deleteProduct(+id);
  }
}
