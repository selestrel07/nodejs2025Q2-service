import { Injectable } from '@nestjs/common';
import { Album } from './dto/album.dto';
import { CreateAlbumDto } from './dto/create-album.dto';
import { randomUUID } from 'crypto';
import { throwNotFoundException } from 'src/utils/throw-exception';

@Injectable()
export class AlbumService {
  private readonly albums: Album[] = [];

  findAll(): Album[] {
    return this.albums;
  }

  findById(id: string): Album {
    const album = this.albums.find((a) => a.id === id);
    if(!album) {
      throwNotFoundException(id, 'Album');
    }
    return album;
  }

  create(createAlbumDto: CreateAlbumDto): Album {
    let id = '';
    while (id.length === 0 || this.albums.find((a) => a.id === id) !== undefined) {
      id = randomUUID();
    }
    const album = new Album({
      id,
      name: createAlbumDto.name,
      year: createAlbumDto.year,
      artistId: createAlbumDto.artistId ?? null,
    });
    this.albums.push(album);
    return album;
  }
}
