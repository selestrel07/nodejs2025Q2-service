import { Controller, Get } from '@nestjs/common';
import { ArtistService } from 'src/artist/artist.service';
import { AlbumService } from 'src/album/album.service';
import { TrackService } from 'src/track/track.service';
import { FavsDto } from './dto/favs.dto';

@Controller('favs')
export class FavsController {
  constructor(private readonly artistService: ArtistService,
    private readonly albumService: AlbumService,
    private readonly trackService: TrackService) {}

  @Get(':type(artist|albumtrack)/:id')
  findAll(): FavsDto {
    return {
      artists: this.artistService.findAllFavoriteArtists(),
      albums: this.albumService.findAllFavoriteAlbums(),
      tracks: this.trackService.findAllFavoriteTracks(),
    }
  }
}
