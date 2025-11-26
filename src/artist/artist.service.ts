import { Injectable } from '@nestjs/common';
import { Artist } from './dto/artist.dto';
import { CreateArtistDto } from './dto/create-artist.dto';
import { randomUUID } from 'crypto';
import { throwNotFoundException } from 'src/utils/throw-exception';
import { AlbumService } from 'src/album/album.service';
import { TrackService } from 'src/track/track.service';

@Injectable()
export class ArtistService {
  private readonly artists: Artist[] = [];
  private readonly favoriteArtists: string[] = [];

  constructor(private readonly albumService: AlbumService, private readonly trackService: TrackService) {}

  findAll(): Artist[] {
    return this.artists;
  }

  findAllFavoriteArtists(): Artist[] {
    return this.artists.filter((artist) => this.favoriteArtists.includes(artist.id));
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
    const artist = this.findById(id);
    artist.name = updateArtistDto.name ?? artist.name;
    artist.grammy = updateArtistDto.grammy ?? artist.grammy;
    return artist;
  }

  remove(id: string): void {
    const artist = this.findById(id);
    this.artists.splice(this.artists.indexOf(artist), 1);
    this.albumService.removeArtistId(id);
    this.trackService.removeArtistId(id);
  }
}
