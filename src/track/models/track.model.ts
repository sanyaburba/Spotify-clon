import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Comment } from './comment.model';
import { Album } from '../../album/models/album.model';

@Table({ tableName: 'tracks' })
export class Track extends Model {
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
  text: string;

  @Column({ type: DataType.INTEGER })
  listens: number;

  @Column({ type: DataType.STRING })
  picture: string;

  @Column({ type: DataType.STRING })
  audio: string;

  @HasMany(() => Comment)
  comments: Comment[];

  @BelongsTo(() => Album)
  album: Album;
  @ForeignKey(() => Album)
  @Column({ type: DataType.INTEGER })
  albumId: number;
}
