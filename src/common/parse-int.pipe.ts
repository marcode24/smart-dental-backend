import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ParseIntPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if(value) {
      const newValue = parseInt(value, 10);
      if (isNaN(newValue)) {
        throw new BadRequestException(`${value} is not a valid id`);
      }
      return newValue;
    }
  }
}
