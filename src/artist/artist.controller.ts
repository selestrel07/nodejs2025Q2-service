import { Controller, Get } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { Artist } from './dto/artist.dto';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get()
  findAll(): Artist[] {
    return this.artistService.findAll();
  }
}
