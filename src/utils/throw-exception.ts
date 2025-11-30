import { HttpException, HttpStatus } from '@nestjs/common';

export const throwNotFoundException = (id: string, entity: string): never => {
  throw new HttpException(
    `${entity} with id ${id} was not found`,
    HttpStatus.NOT_FOUND,
  );
};

export const throwDtoBadRequestException = (fields: string[]): never => {
  throw new HttpException(
    `Request body does not contain all required fields (${fields.join(', ')}) or some field value is wrong or has wrong data type`,
    HttpStatus.BAD_REQUEST,
  );
};

export const throwUnprocessableEntityException = (
  id: string,
  entity: string,
): never => {
  throw new HttpException(
    `${entity} with id ${id} was not found`,
    HttpStatus.UNPROCESSABLE_ENTITY,
  );
};

export const throwFavoriteNotFoundException = (
  id: string,
  entity: string,
): never => {
  throw new HttpException(
    `${entity} with id ${id} was not found in favorite ${entity.toLowerCase()}s`,
    HttpStatus.NOT_FOUND,
  );
};
