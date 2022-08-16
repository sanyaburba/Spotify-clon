import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Track } from '../../track/models/track.model';

@Table({ tableName: 'albums' })
export class Album extends Model {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING })
  name: string;

  @Column({ type: DataType.STRING })
  artist: string;

  @Column({ type: DataType.STRING })
  picture: string;

  // @Column({ type: DataType.INTEGER })
  // listens: number;

  @HasMany(() => Track)
  tracks: Track[];
}
