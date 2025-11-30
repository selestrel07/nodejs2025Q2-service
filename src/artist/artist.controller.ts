import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ArtistService } from './artist.service';
import { Artist } from './dto/artist.dto';
import { PathParameters } from 'src/interfaces/path-params';
import { validateId } from 'src/utils/validateId';
import { CreateArtistDto } from './dto/create-artist.dto';
import { validateCreateArtistDto } from 'src/utils/dto-validation';

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
    validateCreateArtistDto(body);
    return this.artistService.create(body);
  }

  @Put(':id')
  update(@Body() body: CreateArtistDto, @Param() params: PathParameters) {
    validateId(params.id);
    validateCreateArtistDto(body);
    return this.artistService.update(params.id, body);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param() params: PathParameters) {
    validateId(params.id);
    this.artistService.remove(params.id);
  }
}
