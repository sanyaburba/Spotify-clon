import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';
import { Album } from './models/album.model';
import { Track } from '../track/models/track.model';
import { FileService } from '../file/file.service';

@Module({
  controllers: [AlbumController],
  providers: [AlbumService, FileService],
  imports: [SequelizeModule.forFeature([Album, Track])],
  exports: [AlbumService],
})
export class AlbumModule {}
