import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

export class ParseDateOptions {
  fromTimeStamp: boolean;
  errorMsg?: string;
}

@Injectable()
export class ParseDatePipe implements PipeTransform {
    private fromTimeStamp :boolean;
    private errMsg : string
  constructor(options: ParseDateOptions) {
    this.fromTimeStamp = options?.fromTimeStamp!== undefined?options.fromTimeStamp:true;
    this.errMsg = options.errorMsg||"Invalid date"
  }
  transform(value: string | number, metadata: ArgumentMetadata) {
    const { data: isKeyGiven } = metadata;
   

    if (isKeyGiven) {
      value = value;
    } else {
      value = value['timestamp'];
    }
    const date = this.fromTimeStamp?this.convertTimestamp(value):new Date(value);
    if (!date || isNaN(+date)) {
      const errMsg = isKeyGiven ? `${isKeyGiven} is invalid` : this.errMsg;
      throw new BadRequestException(errMsg);
    }
    const { metatype } = metadata;
    switch (metatype) {
      case String:
        return date.toUTCString();
      case Date:
        return date;
      case Number:
        return date.getTime();
      default:
        return date.toISOString();
    }
  }
  convertTimestamp(timestamp: string | number) {
    console.log("timestamp")
    timestamp = +timestamp;

    const isSecond = !(timestamp > (Date.now() + 24 * 60 * 60 * 1000) / 1000);

    return isSecond ? new Date(timestamp * 1000) : new Date(timestamp);
  }
}
