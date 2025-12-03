import { ClassSerializerContextOptions, ClassSerializerInterceptor, Injectable, PlainLiteralObject } from "@nestjs/common";
import { Reflector } from '@nestjs/core';

@Injectable()
export class BigIntInterceptor extends ClassSerializerInterceptor {
  constructor(reflector: Reflector) {
    super(reflector);
  }

  serialize(response: PlainLiteralObject | Array<PlainLiteralObject>, options: ClassSerializerContextOptions): PlainLiteralObject | Array<PlainLiteralObject> {
    const serialized = super.serialize(response, options);
    const convertBigint = (obj: unknown): unknown => {
      if (typeof obj === 'bigint') return Number(obj);
      if (Array.isArray(obj)) return obj.map(convertBigint);
      if (obj && typeof obj === 'object') {
        return Object.fromEntries(
          Object.entries(obj).map(([key, value]) => [key, convertBigint(value)])
        );
      }
      return obj;
    }
    return convertBigint(serialized);
  }
}