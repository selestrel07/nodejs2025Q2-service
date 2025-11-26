import { Body, Controller, Get, Post, Param, Put } from '@nestjs/common';
import { AlbumService } from './album.service';
import { Album } from './dto/album.dto';
import { CreateAlbumDto } from './dto/create-album.dto';
import { PathParameters } from 'src/interfaces/path-params';
import { validateId } from 'src/utils/validateId';
import { validateCreateAlbumDto } from 'src/utils/dto-validation';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  findAll(): Album[] {
    return this.albumService.findAll();
  }

  @Get(':id')
  findById(@Param() params: PathParameters) {
    validateId(params.id);
    return this.albumService.findById(params.id);
  }

  @Post()
  create(@Body() body: CreateAlbumDto) {
    validateCreateAlbumDto(body);
    return this.albumService.create(body);
  }

  @Put(':id')
  update(@Param() params: PathParameters, @Body() body: CreateAlbumDto) {
    validateId(params.id);
    validateCreateAlbumDto(body);
    return this.albumService.update(params.id, body);
  }
}
