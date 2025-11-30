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
  findAll(): Track[] {
    return this.trackService.findAll();
  }

  @Get(':id')
  findById(@Param() params: PathParameters): Track {
    validateId(params.id);
    return this.trackService.findById(params.id);
  }

  @Post()
  create(@Body() body: CreateTrackDto): Track {
    validateCreateTrackDto(body);
    return this.trackService.create(body);
  }

  @Put(':id')
  update(@Param() params: PathParameters, @Body() body: CreateTrackDto): Track {
    validateId(params.id);
    validateCreateTrackDto(body);
    return this.trackService.update(params.id, body);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param() params: PathParameters): void {
    validateId(params.id);
    this.trackService.remove(params.id);
  }
}
