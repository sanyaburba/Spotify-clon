import { Module } from '@nestjs/common';
import { TrackController } from './track.controller';
import { TrackService } from './track.service';
import { Track } from './models/track.model';
import { Comment } from './models/comment.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { FileService } from '../file/file.service';

@Module({
  imports: [SequelizeModule.forFeature([Track, Comment])],
  controllers: [TrackController],
  providers: [TrackService, FileService],
})
export class TrackModule {}
