import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class createProductsDTO {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  name: string;
  
  @IsNumber()
  @IsNotEmpty()
  price: number;
}
