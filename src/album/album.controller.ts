import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { Track } from '../track/models/track.model';
import { AddTracksDto } from './dto/add-tracks.dto';

@Controller('album')
export class AlbumController {
  constructor(private albumService: AlbumService) {}

  @Post('/createAlbum')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'picture', maxCount: 1 }]))
  async createAlbum(@UploadedFiles() file, @Body() dto: CreateAlbumDto) {
    const { picture } = file;
    return await this.albumService.createAlbum(dto, picture[0]);
  }

  @Get()
  getAllAlbums(@Query('count') count: number, @Query('offset') offset: number) {
    return this.albumService.getAllAlbums(count, offset);
  }

  @Post('/addTracks')
  async addTracks(@Body() dto: AddTracksDto) {
    return await this.albumService.addTracks(dto);
  }

  //
  // @Get('/search')
  //   searchAlbum(@Query('searchQuery') searchQuery: string) {
  //     return this.albumService.search(searchQuery);
  //   }
  //
  @Get(':id')
  getOneAlbum(@Param('id') id: number) {
    return this.albumService.getOneAlbum(id);
  }

  @Delete(':id')
  deleteAlbum(@Param('id') id: number) {
    return this.albumService.deleteAlbum(id);
  }
}
