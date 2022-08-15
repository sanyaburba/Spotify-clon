import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Comment } from './comment.model';

@Table({ tableName: 'tracks' })
export class Track extends Model {
  @Column({ type: DataType.STRING })
  name: string;

  @Column({ type: DataType.STRING })
  musician: string;

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

  // @BelongsTo(() => Album)
  // album: Album;
  //
  // @ForeignKey(() => Album)
  // @Column({ type: DataType.INTEGER })
  // albumId: number;
}
