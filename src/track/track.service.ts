import { Injectable } from '@nestjs/common';
import { Track } from './dto/track.dto';

@Injectable()
export class TrackService {
  private readonly tracks: Track[] = [];

  findAll(): Track[] {
    return this.tracks;
  }
}
