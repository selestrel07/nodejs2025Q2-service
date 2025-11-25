import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Artist } from './dto/artist.dto';
import { CreateArtistDto } from './dto/create-artist.dto';
import { randomUUID } from 'crypto';
import { throwNotFoundException } from 'src/utils/throw-exceprion';

@Injectable()
export class ArtistService {
  private readonly artists: Artist[] = [];

  findAll(): Artist[] {
    return this.artists;
  }

  findById(id: string): Artist {
    const artist = this.artists.find((a) => a.id === id);
    if (!artist) {
      throwNotFoundException(id, 'Artist');
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

  update(id: string, updateArtistDto: CreateArtistDto): Artist {
    const artist = this.artists.find((a) => a.id === id);
    if (!artist) {
      throwNotFoundException(id, 'Artist');
    }
    artist.name = updateArtistDto.name ?? artist.name;
    artist.grammy = updateArtistDto.grammy ?? artist.grammy;
    return artist;
  }

  remove(id: string): void {
    const artist = this.findById(id);
    if (!artist) {
      throwNotFoundException(id, 'Artist');
    }
    this.artists.splice(this.artists.indexOf(artist), 1);
  }
}
