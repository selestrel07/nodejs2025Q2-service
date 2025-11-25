import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { TrackService } from './track.service';
import { Track } from './dto/track.dto';
import { PathParameters } from 'src/interfaces/path-params';
import { validateId } from 'src/utils/validateId';
import { CreateTrackDto } from './dto/create-track.dto';

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
    if (!('name' in body && 'duration' in body) || !(typeof body.name === 'string' && typeof body.duration === 'number')) {
      throw new HttpException('Request body does not contain all required fields (name, duration) or some field is empty or has wrong data type', HttpStatus.BAD_REQUEST);
    }
    return this.trackService.create(body);
  }

  @Put(':id')
  update(@Param() params: PathParameters, @Body() body: CreateTrackDto): Track {
    validateId(params.id);
    return this.trackService.update(params.id, body);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param() params: PathParameters): void {
    validateId(params.id);
    this.trackService.remove(params.id);
  }
}
