import { Controller, Get } from '@nestjs/common';
import { AlbumService } from './album.service';
import { Album } from './dto/album.dto';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  findAll(): Album[] {
    return this.albumService.findAll();
  }
}
