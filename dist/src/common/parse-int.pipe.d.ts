import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
export declare class ParseIntPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata): number;
}
