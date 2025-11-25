import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Artist } from './dto/artist.dto';
import { CreateArtistDto } from './dto/create-artist.dto';
import { randomUUID } from 'crypto';

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

  create(createArtistDto: CreateArtistDto): Artist {
    let id = '';
    while (id.length === 0 || this.artists.find((a) => a.id === id) !== undefined) {
      id = randomUUID();
    }
    const artist = new Artist({
      id,
      name: createArtistDto.name,
      grammy: createArtistDto.grammy,
    });
    this.artists.push(artist);
    return artist;
  }
}
