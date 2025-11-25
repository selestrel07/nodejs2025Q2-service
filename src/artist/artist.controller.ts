import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { Artist } from './dto/artist.dto';
import { PathParameters } from 'src/interfaces/path-params';
import { validateId } from 'src/utils/validateId';
import { CreateArtistDto } from './dto/create-artist.dto';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get()
  findAll(): Artist[] {
    return this.artistService.findAll();
  }

  @Get(':id')
  findById(@Param() params: PathParameters) {
    validateId(params.id);
    return this.artistService.findById(params.id);
  }

  @Post()
  create(@Body() body: CreateArtistDto) {
    if (!('name' in body && 'grammy' in body) || !(typeof body.name === 'string' && typeof body.grammy === 'boolean')) {
      throw new HttpException('Request body does not contain all required fields (name, grammy) or some field is empty or has wrong data type', HttpStatus.BAD_REQUEST);
    }
    return this.artistService.create(body);
  }

  @Put(':id')
  update(@Body() body: CreateArtistDto, @Param() params: PathParameters) {
    validateId(params.id);
    return this.artistService.update(params.id, body);
  }
}
