import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Artist } from './dto/artist.dto';

@Injectable()
export class ArtistService {
  private readonly artists: Artist[] = [];

  findAll(): Artist[] {
    return this.artists;
  }

  findById(id: string): Artist {
    const artist = this.artists.find((a) => a.id === id);
    if (!artist) {
      throw new HttpException(`Artist with id '${id}' was not found`, HttpStatus.NOT_FOUND);
    }
    return artist;
  }
}
