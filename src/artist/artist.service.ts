import { Injectable } from '@nestjs/common';
import { Artist } from './dto/artist.dto';
import { CreateArtistDto } from './dto/create-artist.dto';
import {
  throwFavoriteNotFoundException,
  throwNotFoundException,
  throwUnprocessableEntityException,
} from 'src/utils/throw-exception';
import { AlbumService } from 'src/album/album.service';
import { TrackService } from 'src/track/track.service';
import { PrismaService } from 'src/db/db.service';

@Injectable()
export class ArtistService {
  constructor(
    private readonly albumService: AlbumService,
    private readonly trackService: TrackService,
    private readonly prismaService: PrismaService,
  ) {}

  async findAll(): Promise<Artist[]> {
    return await this.prismaService.artist.findMany();
  }

  async findAllFavoriteArtists(): Promise<Artist[]> {
    return (await this.prismaService.favoriteArtist.findMany({
      include: {
        artist: true
      }
    })).map((artist) => artist.artist);
  }

  async findById(id: string): Promise<Artist> {
    const artist = await this.prismaService.artist.findUnique({
      where: {
        id,
      },
    });
    if (!artist) {
      throwNotFoundException(id, 'Artist');
    }
    return artist;
  }

  async create(createArtistDto: CreateArtistDto): Promise<Artist> {
    const artist = await this.prismaService.artist.create({
      data: createArtistDto,
      select: { id: true, name: true, grammy: true },
    });
    return artist;
  }

  async update(id: string, updateArtistDto: CreateArtistDto): Promise<Artist> {
    try {
      const artist = await this.prismaService.artist.update({
        where: {
          id,
        },
        data: updateArtistDto,
        select: { id: true, name: true, grammy: true },
      });
      return artist;
    } catch {
      throwNotFoundException(id, 'Artist');
    }
  }

  async remove(id: string): Promise<void> {
    try {
      await this.prismaService.artist.delete({
        where: {
          id
        },
      });
    } catch {
      throwNotFoundException(id, 'Artist');
    }
  }

  async addToFavorites(artistId: string): Promise<void> {
    try {
      await this.prismaService.favoriteArtist.create({
        data: {
          artistId,
        },
      });
    } catch {
      throwUnprocessableEntityException(artistId, 'Artist');
    }
  }

  async removeFromFavorites(artistId: string): Promise<void> {
    try {
      await this.prismaService.favoriteArtist.delete({
        where: {
          artistId,
        },
      });
    } catch {
      throwFavoriteNotFoundException(artistId, 'Artist');
    }
  }
}
