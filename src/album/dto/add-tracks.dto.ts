import { Track } from '../../track/models/track.model';

export class AddTracksDto {
  readonly tracks: Track[];
  readonly albumId: number;
}
