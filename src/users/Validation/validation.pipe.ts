import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class CustomValidationPipe implements PipeTransform {
  private isEmpty(value: any) {
    if (Object.keys(value).length < 1) {
      return true;
    }
    return false;
  }

  private formatErrors(errors: any[]) {
    return errors
      .map((error) => {
        for (let key in error.constraints) {
          return error.constraints[key];
        }
      })
      .join(',');
  }
  async transform(value: any, metaData: ArgumentMetadata) {
    const { metatype } = metaData;
    if (this.isEmpty(value)) {
      throw new HttpException(`Validation Failed!`, HttpStatus.BAD_REQUEST);
    }

    const object = plainToClass(metatype, value);
    const errors = await validate(object);

    if (errors.length > 0) {
      throw new HttpException(
        `Validation failed:${this.formatErrors(errors)}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
