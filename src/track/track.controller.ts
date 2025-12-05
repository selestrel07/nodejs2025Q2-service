import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TrackService } from './track.service';
import { Track } from './dto/track.dto';
import { PathParameters } from 'src/interfaces/path-params';
import { validateId } from 'src/utils/validateId';
import { CreateTrackDto } from './dto/create-track.dto';
import { validateCreateTrackDto } from 'src/utils/dto-validation';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get()
  async findAll(): Promise<Track[]> {
    return await this.trackService.findAll();
  }

  @Get(':id')
  async findById(@Param() params: PathParameters): Promise<Track> {
    validateId(params.id);
    return await this.trackService.findById(params.id);
  }

  @Post()
  async create(@Body() body: CreateTrackDto): Promise<Track> {
    validateCreateTrackDto(body);
    return await this.trackService.create(body);
  }

  @Put(':id')
  async update(
    @Param() params: PathParameters,
    @Body() body: CreateTrackDto,
  ): Promise<Track> {
    validateId(params.id);
    validateCreateTrackDto(body);
    return await this.trackService.update(params.id, body);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param() params: PathParameters): Promise<void> {
    validateId(params.id);
    await this.trackService.remove(params.id);
  }
}
