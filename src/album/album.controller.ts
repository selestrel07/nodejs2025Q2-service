import { Body, Controller, Get, HttpException, Post, HttpStatus } from '@nestjs/common';
import { AlbumService } from './album.service';
import { Album } from './dto/album.dto';
import { CreateAlbumDto } from './dto/create-album.dto';
import { isInt, isString } from 'class-validator';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  findAll(): Album[] {
    return this.albumService.findAll();
  }

  @Post()
  create(@Body() body: CreateAlbumDto) {
    if (!('name' in body && 'year' in body)
      || !(isString(body.name) && body.name.length !== 0 &&  isInt(body.year)
        && body.year > 0 && body.year <= new Date().getFullYear())) {
          throw new HttpException('Request body does not contain all required fields (name, year) or some field value is wrong or has wrong data type', HttpStatus.BAD_REQUEST);
    }
    return this.albumService.create(body);
  }
}
