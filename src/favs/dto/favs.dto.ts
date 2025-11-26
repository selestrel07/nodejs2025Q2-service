import { Album } from "src/album/dto/album.dto";
import { Artist } from "src/artist/dto/artist.dto";
import { Track } from "src/track/dto/track.dto";

export class FavsDto {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}