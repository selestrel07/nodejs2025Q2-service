import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Put,
  Delete,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { AlbumService } from './album.service';
import { Album } from './dto/album.dto';
import { CreateAlbumDto } from './dto/create-album.dto';
import { PathParameters } from 'src/interfaces/path-params';
import { validateId } from 'src/utils/validateId';
import { validateCreateAlbumDto } from 'src/utils/dto-validation';
import { AuthGuard } from 'src/guard/auth.guard';

@Controller('album')
@UseGuards(AuthGuard)
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  async findAll(): Promise<Album[]> {
    return await this.albumService.findAll();
  }

  @Get(':id')
  async findById(@Param() params: PathParameters): Promise<Album> {
    validateId(params.id);
    return await this.albumService.findById(params.id);
  }

  @Post()
  async create(@Body() body: CreateAlbumDto): Promise<Album> {
    validateCreateAlbumDto(body);
    return await this.albumService.create(body);
  }

  @Put(':id')
  async update(
    @Param() params: PathParameters,
    @Body() body: CreateAlbumDto,
  ): Promise<Album> {
    validateId(params.id);
    validateCreateAlbumDto(body);
    return await this.albumService.update(params.id, body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param() params: PathParameters): Promise<void> {
    validateId(params.id);
    await this.albumService.remove(params.id);
  }
}
