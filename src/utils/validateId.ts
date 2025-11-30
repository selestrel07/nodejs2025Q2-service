import { HttpException, HttpStatus } from '@nestjs/common';
import { validate } from 'uuid';

export const validateId = (id: string): void => {
  if (!validate(id)) {
    throw new HttpException(
      `'${id}' is not a valid UUID`,
      HttpStatus.BAD_REQUEST,
    );
  }
};
