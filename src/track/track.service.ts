import { Injectable } from '@nestjs/common';
import { Track } from './dto/track.dto';
import { throwNotFoundException } from 'src/utils/throw-exceprion';
import { CreateTrackDto } from './dto/create-track.dto';
import { randomUUID } from 'crypto';

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

  create(createTrackDto: CreateTrackDto): Track {
    let id = '';
    while (id.length === 0 || this.tracks.find((a) => a.id === id) !== undefined) {
      id = randomUUID();
    }
    const track = new Track({
      id,
      name: createTrackDto.name,
      artistId: createTrackDto.artistId ?? null,
      albumId: createTrackDto.albumId ?? null,
      duration: createTrackDto.duration,
    });
    this.tracks.push(track);
    return track;
  }
}
