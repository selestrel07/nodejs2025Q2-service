import { Controller, Get, Post, HttpCode, Param, Delete } from '@nestjs/common';
import { ArtistService } from 'src/artist/artist.service';
import { AlbumService } from 'src/album/album.service';
import { TrackService } from 'src/track/track.service';
import { FavsDto } from './dto/favs.dto';
import { validateId } from 'src/utils/validateId';

@Controller('favs')
export class FavsController {
  constructor(
    private readonly artistService: ArtistService,
    private readonly albumService: AlbumService,
    private readonly trackService: TrackService,
  ) {}

  @Get()
  async findAll(): Promise<FavsDto> {
    return {
      artists: await this.artistService.findAllFavoriteArtists(),
      albums: await this.albumService.findAllFavoriteAlbums(),
      tracks: await this.trackService.findAllFavoriteTracks(),
    };
  }

  @Post(':type(artist|album|track)/:id')
  async addToFavorites(@Param('id') id: string, @Param('type') type: string): Promise<void> {
    validateId(id);
    switch (type) {
      case 'artist': {
        await this.artistService.addToFavorites(id);
        break;
      }
      case 'album': {
        await this.albumService.addToFavorites(id);
        break;
      }
      case 'track': {
        await this.trackService.addToFavorites(id);
        break;
      }
    }
  }

  @Delete(':type(artist|album|track)/:id')
  @HttpCode(204)
  async removeFromFavorites(
    @Param('id') id: string,
    @Param('type') type: string,
  ): Promise<void> {
    validateId(id);
    switch (type) {
      case 'artist': {
        await this.artistService.removeFromFavorites(id);
        break;
      }
      case 'album': {
        await this.albumService.removeFromFavorites(id);
        break;
      }
      case 'track': {
        await this.trackService.removeFromFavorites(id);
        break;
      }
    }
  }
}
