import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  HttpStatus,
  UseGuards
} from '@nestjs/common';
import { ArtistService } from './artist.service';
import { Artist } from './dto/artist.dto';
import { PathParameters } from 'src/interfaces/path-params';
import { validateId } from 'src/utils/validateId';
import { CreateArtistDto } from './dto/create-artist.dto';
import { validateCreateArtistDto } from 'src/utils/dto-validation';
import { AuthGuard } from 'src/guard/auth.guard';

@Controller('artist')
@UseGuards(AuthGuard)
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get()
  async findAll(): Promise<Artist[]> {
    return await this.artistService.findAll();
  }

  @Get(':id')
  async findById(@Param() params: PathParameters): Promise<Artist> {
    validateId(params.id);
    return await this.artistService.findById(params.id);
  }

  @Post()
  async create(@Body() body: CreateArtistDto): Promise<Artist> {
    validateCreateArtistDto(body);
    return await this.artistService.create(body);
  }

  @Put(':id')
  async update(
    @Body() body: CreateArtistDto,
    @Param() params: PathParameters,
  ): Promise<Artist> {
    validateId(params.id);
    validateCreateArtistDto(body);
    return await this.artistService.update(params.id, body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param() params: PathParameters): Promise<void> {
    validateId(params.id);
    await this.artistService.remove(params.id);
  }
}
