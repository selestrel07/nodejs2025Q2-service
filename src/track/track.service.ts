import { Injectable } from '@nestjs/common';
import { Track } from './dto/track.dto';
import { throwNotFoundException, throwUnprocessableEntityException } from 'src/utils/throw-exception';
import { CreateTrackDto } from './dto/create-track.dto';
import { randomUUID } from 'crypto';

@Injectable()
export class TrackService {
  private readonly tracks: Track[] = [];
  private readonly favoriteTracks: string[] = [];

  findAll(): Track[] {
    return this.tracks;
  }

  findAllFavoriteTracks(): Track[] {
    return this.tracks.filter((track) => this.favoriteTracks.includes(track.id));
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

  update(id: string, updateTrackDto: CreateTrackDto): Track {
    const track = this.findById(id);
    track.name = updateTrackDto.name ?? track.name;
    track.artistId = updateTrackDto.artistId ?? track. artistId;
    track.albumId = updateTrackDto.albumId ?? track.albumId;
    track.duration = updateTrackDto.duration ?? track.duration;
    return track;
  }

  remove(id: string): void {
    const track = this.findById(id);
    this.tracks.splice(this.tracks.indexOf(track), 1);
  }

  removeArtistId(artistId: string): void {
    this.tracks
      .filter((track) => track.artistId === artistId)
      .forEach((track) => track.artistId = null);
  }

  removeAlbumId(albumId: string): void {
    this.tracks
      .filter((track) => track.albumId === albumId)
      .forEach((track) => track.albumId = null);
  }

  addToFavorite(id: string) {
    if (!this.tracks.map((track) => track.id).includes(id)) {
      throwUnprocessableEntityException(id, 'Album');
    }
    this.favoriteTracks.push(id);
  }
}
