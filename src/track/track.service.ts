import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Track } from './dto/track.dto';
import {
  throwFavoriteNotFoundException,
  throwNotFoundException,
  throwUnprocessableEntityException,
} from 'src/utils/throw-exception';
import { CreateTrackDto } from './dto/create-track.dto';
import { PrismaService } from 'src/db/db.service';
import { PrismaClientKnownRequestError, PrismaClientValidationError } from '@prisma/client/runtime/client';

@Injectable()
export class TrackService {
  private readonly tracks: Track[] = [];
  private readonly favoriteTracks: string[] = [];

  constructor(private readonly prismaService: PrismaService) {}

  async findAll(): Promise<Track[]> {
    return await this.prismaService.track.findMany();
  }

  async findAllFavoriteTracks(): Promise<Track[]> {
    return (await this.prismaService.favoriteTrack.findMany({
      include: { track: true },
    })).map((track) => track.track);
  }

  async findById(id: string): Promise<Track> {
    const track = await this.prismaService.track.findUnique({
      where: { id },
    });
    if (!track) {
      throwNotFoundException(id, 'Track');
    }
    return track;
  }

  async create(createTrackDto: CreateTrackDto): Promise<Track> {
    try {
      return await this.prismaService.track.create({
        data: createTrackDto,
        select: { id: true, name: true, duration: true, artistId: true, albumId: true },
      });
    } catch {
      throw new HttpException(
        `Check your data: artist or album with provided id doesn't exist in the database`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  async update(id: string, updateTrackDto: CreateTrackDto): Promise<Track> {
    try {
      return await this.prismaService.track.update({
        data: updateTrackDto,
        where: { id },
        select: { id: true, name: true, duration: true, artistId: true, albumId: true },
      });
    } catch (e) {
      if (e instanceof PrismaClientValidationError || (e instanceof PrismaClientKnownRequestError && e.code === 'P2003')) {
        throw new HttpException(
          `Check your data: artist or album with provided id doesn't exist in the database`,
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      } else {
        throwNotFoundException(id, 'Track');
      }
    }
  }

  async remove(id: string): Promise<void> {
    try {
      await this.prismaService.track.delete({
        where: { id },
      });
    } catch {
      throwNotFoundException(id, 'Track');
    }
  }

  async addToFavorites(trackId: string): Promise<void> {
    try {
      await this.prismaService.favoriteTrack.create({
        data: { trackId },
      });
    } catch {
      throwUnprocessableEntityException(trackId, 'Track');
    }
  }

  async removeFromFavorites(trackId: string): Promise<void> {
    try {
      await this.prismaService.favoriteTrack.delete({
        where: { trackId },
      });
    } catch {
      throwFavoriteNotFoundException(trackId, 'Track');
    }
  }
}
