import { Injectable } from '@nestjs/common';
import { Track } from './dto/track.dto';
import { throwNotFoundException } from 'src/utils/throw-exceprion';

@Injectable()
export class TrackService {
  private readonly tracks: Track[] = [];

  findAll(): Track[] {
    return this.tracks;
  }

  findById(id: string): Track {
    const track = this.tracks.find((t) => t.id === id);
    if (!track) {
      throwNotFoundException(id, 'Track');
    }
    return track;
  }
}
