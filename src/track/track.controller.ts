import { Controller, Get } from '@nestjs/common';
import { TrackService } from './track.service';
import { Track } from './dto/track.dto';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get()
  findAll(): Track[] {
    return this.trackService.findAll();
  }
}
