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
  Query,
  Req,
  UnauthorizedException,
  UseFilters,
  UseGuards,
  UseInterceptors,
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
import { AppExceptionFilter } from 'src/exceptions/AppException.filter';
import { Request } from 'express';
import { ProductsInterceptor } from './Interceptors/products.interceptors';
import { RecentSearchProduct } from './recent-search.service';
import { ProductsGuard } from './guards/products.guard';
@Controller('products')
// @UseFilters(HttpExceptionFilter)
export class ProductsController {
  constructor(
    private productService: ProductsService,
    private recentSearchProduct: RecentSearchProduct,
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
  create(
    @Body(new ValidationPipe({ stopAtFirstError: true }))
    createProductsDto: createProductsDTO,
  ) {
    return this.productService.createProducts(createProductsDto);
  }

  @Post('/timestamps')
  createTimestamp(@Body(ParseDatePipe) date: Date) {
    return date;
  }

  @Get()
  @UseGuards(ProductsGuard)
  findAll(@Ip() ip: string, @Req() req: Request) {
    console.log(ip);
    console.log(req['ua']);

    return this.productService.getAllProducts();
  }
  @Get('/search')
  @UseInterceptors(ProductsInterceptor)
  findSearch(@Query('query') query: string) {
    return this.productService.getSearchProduct(query);
  }
  @Get('/recent-search')
  findRecenetSearch(@Query('token') token: string) {
    return this.recentSearchProduct.find(token);
  }
  @Get('/:id')
  // @UseFilters(IdExceptionFilter)
  // @UseFilters(AppExceptionFilter)
  findOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    if (id <= 0) {
      throw new Error('Invalid ID');
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
      // throw new BadRequestException("Id must be higher than 0", "id is not valid")
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
