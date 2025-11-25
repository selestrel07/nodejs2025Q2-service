import { Injectable } from '@nestjs/common';
import { Album } from './dto/album.dto';

@Injectable()
export class AlbumService {
  private readonly albums: Album[] = [];

  findAll(): Album[] {
    return this.albums;
  }
}
