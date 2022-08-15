import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Track } from './track.model';

@Table
export class Comment extends Model {
  @Column({ type: DataType.STRING })
  username: string;

  @Column({ type: DataType.STRING })
  text: string;

  @BelongsTo(() => Track)
  track: Track;

  @ForeignKey(() => Track)
  @Column({ type: DataType.INTEGER })
  trackId: number;
}
