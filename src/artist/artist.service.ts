import { Injectable } from '@nestjs/common';
import { Artist } from './dto/artist.dto';

@Injectable()
export class ArtistService {
  private readonly artists: Artist[] = [];

  findAll(): Artist[] {
    return this.artists;
  }
}
