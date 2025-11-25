import { HttpException, HttpStatus } from "@nestjs/common"

export const throwNotFoundException = (id: string, entity: string): never => {
  throw new HttpException(`${entity} with id ${id} was not found`, HttpStatus.NOT_FOUND);
}