import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { isNotEmptyObject } from 'class-validator';

@Injectable()
export class NotEmptyValidationPipe implements PipeTransform<any> {
  async transform(value: any, arg: ArgumentMetadata) {
    if (!isNotEmptyObject(value) && arg.type == 'body') {
      throw new HttpException('Body cannot be empty', HttpStatus.BAD_REQUEST);
    }

    return value;
  }
}
