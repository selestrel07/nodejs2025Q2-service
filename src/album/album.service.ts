import { Injectable } from '@nestjs/common';
import { Album } from './dto/album.dto';
import { CreateAlbumDto } from './dto/create-album.dto';
import { randomUUID } from 'crypto';
import { throwFavoriteNotFoundException, throwNotFoundException, throwUnprocessableEntityException } from 'src/utils/throw-exception';
import { isString } from 'class-validator';
import { TrackService } from 'src/track/track.service';

@Injectable()
export class AlbumService {
  private readonly albums: Album[] = [];
  private readonly favoriteAlbums: string[] = [];

  constructor (private readonly trackService: TrackService) {}

  findAll(): Album[] {
    return this.albums;
  }

  findAllFavoriteAlbums(): Album[] {
    return this.albums.filter((album) => this.favoriteAlbums.includes(album.id));
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

  update(id: string, updateAlbumDto: CreateAlbumDto): Album {
    const album = this.findById(id);
    album.name = updateAlbumDto.name;
    album.year = updateAlbumDto.year;
    if (isString(updateAlbumDto.artistId) || updateAlbumDto.artistId === null) {
      album.artistId = updateAlbumDto.artistId;
    }
    return album;
  }

  remove(id: string): void {
    const album = this.findById(id);
    this.albums.splice(this.albums.indexOf(album), 1);
    this.trackService.removeAlbumId(id);
    if (this.favoriteAlbums.includes(id)) {
      this.favoriteAlbums.splice(this.favoriteAlbums.indexOf(id), 1);
    }
  }

  removeArtistId(artistId: string): void {
    this.albums
      .filter((album) => album.artistId === artistId)
      .forEach((album) => album.artistId = null);
  }

  addToFavorites(id: string):void {
    if (!this.albums.map((album) => album.id).includes(id)) {
      throwUnprocessableEntityException(id, 'Album');
    }
    this.favoriteAlbums.push(id);
  }

  removeFromFavorites(id: string): void {
    if (!this.favoriteAlbums.includes(id)) {
      throwFavoriteNotFoundException(id, 'Album');
    }
    this.favoriteAlbums.splice(this.favoriteAlbums.indexOf(id), 1);
  }
}
