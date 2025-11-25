import { Controller, Get, Param } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { Artist } from './dto/artist.dto';
import { PathParameters } from 'src/interfaces/path-params';
import { validateId } from 'src/utils/validateId';

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
}
