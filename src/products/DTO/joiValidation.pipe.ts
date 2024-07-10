import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { ObjectSchema } from 'joi';

@Injectable()
export class joiValidationPipe implements PipeTransform {
  constructor(private schema: ObjectSchema) {}
  transform(value: Record<string, any>) {
   const {error} = this.schema.validate(value);
   if(error){
 console.log(error);
 throw new BadRequestException({
    error:"Validation Failed",
    message:error.message.replace(/\"/g,"")
 })
 
   }
  return value
  }
}
