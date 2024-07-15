import { Prop, Schema } from '@nestjs/mongoose';
import { ACCOUNT_STATUS, ACCOUNT_TYPE } from 'src/constants/account.constants';

@Schema({
  timestamps: true,
})
export class User {
  @Prop({
    required: true,
  })
  name: string;

  @Prop({
    required: true,
  })
  email: string;

  @Prop({
    required: true,
    select:false
  })
  password: string;

  @Prop()
  age?: number;

  @Prop()
  phone?: string;

 @Prop({
    type:String,
    enum:Object.keys(ACCOUNT_STATUS),
    default:ACCOUNT_STATUS.ACTIVE
 })
 status?:ACCOUNT_STATUS

 @Prop({
    type:String,
    enum:Object.keys(ACCOUNT_TYPE),
    immutable:true,
    required:true
 })
 accountType:ACCOUNT_TYPE

 @Prop({default:[]})
 social?:string[]

 @Prop({default:false})
 isEmailVerified?:boolean

 @Prop({required:true})
 address;
}
