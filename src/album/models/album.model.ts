import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Track } from '../../track/models/track.model';

@Table({ tableName: 'albums' })
export class Album extends Model {
  @Column({ type: DataType.STRING })
  name: string;

  @Column({ type: DataType.STRING })
  musician: string;

  @Column({ type: DataType.STRING })
  picture: string;

  @HasMany(() => Track)
  tracks: Track[];
}
