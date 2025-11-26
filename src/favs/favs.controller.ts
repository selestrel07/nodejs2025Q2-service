import { Controller, Get, Post, HttpCode, Param, Delete } from '@nestjs/common';
import { ArtistService } from 'src/artist/artist.service';
import { AlbumService } from 'src/album/album.service';
import { TrackService } from 'src/track/track.service';
import { FavsDto } from './dto/favs.dto';
import { validateId } from 'src/utils/validateId';

@Controller('favs')
export class FavsController {
  constructor(private readonly artistService: ArtistService,
    private readonly albumService: AlbumService,
    private readonly trackService: TrackService) {}

  @Get()
  findAll(): FavsDto {
    return {
      artists: this.artistService.findAllFavoriteArtists(),
      albums: this.albumService.findAllFavoriteAlbums(),
      tracks: this.trackService.findAllFavoriteTracks(),
    }
  }

  @Post(':type(artist|album|track)/:id')
  addToFavorites(@Param('id') id: string, @Param('type') type: string): void {
    validateId(id);
    switch(type) {
      case 'artist': {
        this.artistService.addToFavorites(id);
        break;
      };
      case 'album': {
        this.albumService.addToFavorites(id);
        break;
      };
      case 'track': {
        this.trackService.addToFavorites(id);
        break;
      };
    }
  }

  @Delete(':type(artist|album|track)/:id')
  @HttpCode(204)
  removeFromFavorites(@Param('id') id: string, @Param('type') type: string): void {
    validateId(id);
    switch(type) {
      case 'artist': {
        this.artistService.removeFromFavorites(id);
        break;
      };
      case 'album': {
        this.albumService.removeFromFavorites(id);
        break;
      };
      case 'track': {
        this.trackService.removeFromFavorites(id);
        break;
      };
    }
  }
}
