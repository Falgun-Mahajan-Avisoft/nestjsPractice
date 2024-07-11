import {
    Body,
  Controller,
  Get,
  Header,
  Headers,
  HttpCode,
  HttpStatus,
  OnModuleInit,
  Param,
  Post,
  Query,
  Redirect,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response, query } from 'express';
import { ProductsService } from 'src/products/products.service';
interface dataDTO{
name:string,
age:number
}
@Controller('users')
export class UsersController implements OnModuleInit {
  onModuleInit() {
      console.log("User Module init");
      
  }
  constructor(  private productService: ProductsService){
    console.log(productService)
  }
  @Get()
  findAll(@Query() query: any) {
    console.log(query);
    return [{ name: query.name, age: query.age }];
  }

  @Get('/headers')
  getHeaders(@Headers() header: any) {
    console.log(header);
    return [];
  }

  @Get('/posts')
  @HttpCode(HttpStatus.FORBIDDEN)
  findPosts(@Req() req: Request, @Res() res: Response) {
    res.status(202).json([]);
  }

  @Get('/profile')
  @HttpCode(HttpStatus.ACCEPTED)
  getProfile(@Res({ passthrough: true }) res: Response) {
    return 'Falgun Mahajan';
  }

  @Get('/comments')
  @Header('Cache-Control', 'none')
  @Header('X-name', 'Falgun')
  getProduct() {
    return 'Products';
  }

  @Get('/redirect')
  @Redirect('/users/account')
  getRedirect() {
    const random = Math.floor(Math.random() * 10);
    console.log(random);

    if (random > 5) {
      return {
        url: '/users/wallet',
      };
    }
  }

  @Get('/account')
  getAccount() {
    return 'Working Account';
  }

  @Get('/wallet')
  getWallet() {
    return 'Working Wallet';
  }
  @Get('/:id')
  findOne(@Param('id') id: string) {
    console.log(id);
    return 'success';
  }

@Post()
create(@Body() requestData:dataDTO){
    console.log(requestData)
    return {
  ...requestData
    }
}
 
}
