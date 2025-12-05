import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/db/db.service';
import { FavsDto } from './dto/favs.dto';
import {
  throwUnprocessableEntityException,
  throwFavoriteNotFoundException,
} from 'src/utils/throw-exception';

@Injectable()
export class FavsService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(): Promise<FavsDto> {
    return {
      artists: (
        await this.prismaService.favoriteArtist.findMany({
          include: { artist: true },
        })
      ).map((a) => a.artist),
      albums: (
        await this.prismaService.favoriteAlbum.findMany({
          include: { album: true },
        })
      ).map((a) => a.album),
      tracks: (
        await this.prismaService.favoriteTrack.findMany({
          include: { track: true },
        })
      ).map((t) => t.track),
    };
  }

  async createFavorite(type: string, id: string): Promise<void> {
    try {
      switch (type) {
        case 'artist': {
          await this.prismaService.favoriteArtist.create({
            data: { artistId: id },
          });
          break;
        }
        case 'album': {
          await this.prismaService.favoriteAlbum.create({
            data: { albumId: id },
          });
          break;
        }
        case 'track': {
          await this.prismaService.favoriteTrack.create({
            data: { trackId: id },
          });
          break;
        }
      }
    } catch {
      throwUnprocessableEntityException(
        id,
        type.slice(0, 1).toUpperCase() + type.slice(1),
      );
    }
  }

  async removeFavorite(type: string, id: string): Promise<void> {
    try {
      switch (type) {
        case 'artist': {
          await this.prismaService.favoriteArtist.delete({
            where: { artistId: id },
          });
          break;
        }
        case 'album': {
          await this.prismaService.favoriteAlbum.delete({
            where: { albumId: id },
          });
          break;
        }
        case 'track': {
          await this.prismaService.favoriteTrack.delete({
            where: { trackId: id },
          });
          break;
        }
      }
    } catch {
      throwFavoriteNotFoundException(
        id,
        type.slice(0, 1).toUpperCase() + type.slice(1),
      );
    }
  }
}
