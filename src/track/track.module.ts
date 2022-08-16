import { forwardRef, Module } from '@nestjs/common';
import { TrackController } from './track.controller';
import { TrackService } from './track.service';
import { Track } from './models/track.model';
import { Comment } from './models/comment.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { FileService } from '../file/file.service';
import { AlbumModule } from '../album/album.module';
import { Album } from '../album/models/album.model';
import { AlbumService } from '../album/album.service';

@Module({
  imports: [
    SequelizeModule.forFeature([Track, Comment, Album]),
    forwardRef(() => AlbumModule),
  ],
  controllers: [TrackController],
  providers: [TrackService, FileService, AlbumService],
  exports: [TrackService],
})
export class TrackModule {}
