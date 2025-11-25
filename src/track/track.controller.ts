import { Controller, Get, Param } from '@nestjs/common';
import { TrackService } from './track.service';
import { Track } from './dto/track.dto';
import { PathParameters } from 'src/interfaces/path-params';
import { validateId } from 'src/utils/validateId';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get()
  findAll(): Track[] {
    return this.trackService.findAll();
  }

  @Get(':id')
  findById(@Param() params: PathParameters) {
    validateId(params.id);
    return this.trackService.findById(params.id);
  }
}
