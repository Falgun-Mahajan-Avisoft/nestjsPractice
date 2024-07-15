import { Prop, Schema } from '@nestjs/mongoose';

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
    enum:["APPROVAL_PENDING", "ACTIVE", "INACTIVE", "BLOCKED", "DELETED"],
    default:"ACTIVE"
 })
 status?:string

 @Prop({
    enum:["STUDENT", "EMPLOYER"],
    immutable:true,
    required:true
 })
 accountType:string
}
