import { Injectable } from '@nestjs/common';
import { Album } from './dto/album.dto';
import { CreateAlbumDto } from './dto/create-album.dto';
import {
  throwFavoriteNotFoundException,
  throwNotFoundException,
  throwUnprocessableEntityException,
} from 'src/utils/throw-exception';
import { PrismaService } from 'src/db/db.service';
import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from '@prisma/client/runtime/client';

@Injectable()
export class AlbumService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(): Promise<Album[]> {
    return await this.prismaService.album.findMany();
  }

  async findAllFavoriteAlbums(): Promise<Album[]> {
    return (
      await this.prismaService.favoriteAlbum.findMany({
        include: {
          album: true,
        },
      })
    ).map((album) => album.album);
  }

  async findById(id: string): Promise<Album> {
    const album = await this.prismaService.album.findUnique({
      where: {
        id,
      },
    });
    if (!album) {
      throwNotFoundException(id, 'Album');
    }
    return album;
  }

  async create(createAlbumDto: CreateAlbumDto): Promise<Album> {
    try {
      return await this.prismaService.album.create({
        data: createAlbumDto,
        select: { id: true, name: true, year: true, artistId: true },
      });
    } catch {
      throwUnprocessableEntityException(createAlbumDto.artistId, 'Artist');
    }
  }

  async update(id: string, updateAlbumDto: CreateAlbumDto): Promise<Album> {
    try {
      const album = await this.prismaService.album.update({
        where: {
          id,
        },
        data: updateAlbumDto,
        select: { id: true, name: true, year: true, artistId: true },
      });
      return album;
    } catch (e: unknown) {
      if (
        e instanceof PrismaClientValidationError ||
        (e instanceof PrismaClientKnownRequestError && e.code === 'P2003')
      ) {
        throwUnprocessableEntityException(updateAlbumDto.artistId, 'Artist');
      } else {
        throwNotFoundException(id, 'Album');
      }
    }
  }

  async remove(id: string): Promise<void> {
    try {
      await this.prismaService.album.delete({
        where: { id },
      });
    } catch {
      throwNotFoundException(id, 'Album');
    }
  }

  async addToFavorites(albumId: string): Promise<void> {
    try {
      await this.prismaService.favoriteAlbum.create({
        data: { albumId },
      });
    } catch {
      throwUnprocessableEntityException(albumId, 'Album');
    }
  }

  async removeFromFavorites(albumId: string): Promise<void> {
    try {
      await this.prismaService.favoriteAlbum.delete({
        where: { albumId },
      });
    } catch {
      throwFavoriteNotFoundException(albumId, 'Album');
    }
  }
}
