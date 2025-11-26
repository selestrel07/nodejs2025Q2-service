import { CreateAlbumDto } from "src/album/dto/create-album.dto";
import { isInt, isString } from 'class-validator';
import { HttpException, HttpStatus } from '@nestjs/common';

export const validateCreateAlbumDto = (createAlbumDto: CreateAlbumDto): void => {
  if (!('name' in createAlbumDto && 'year' in createAlbumDto)
    || !(isString(createAlbumDto.name) && createAlbumDto.name.length !== 0 &&  isInt(createAlbumDto.year)
      && createAlbumDto.year > 0 && createAlbumDto.year <= new Date().getFullYear())) {
        throw new HttpException('Request body does not contain all required fields (name, year) or some field value is wrong or has wrong data type', HttpStatus.BAD_REQUEST);
  }
}