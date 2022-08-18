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
import { AddTracksDto } from './dto/add-tracks.dto';

@Controller('album')
export class AlbumController {
  constructor(private albumService: AlbumService) {}

  @Get()
  getAll(@Query('count') count: number, @Query('offset') offset: number) {
    return this.albumService.getAll(count, offset);
  }

  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.albumService.getOne(id);
  }

  @Get('/search')
  search(@Query('searchQuery') searchQuery: string) {
    return this.albumService.search(searchQuery);
  }

  @Post('/createAlbum')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'picture', maxCount: 1 }]))
  async create(@UploadedFiles() file, @Body() dto: CreateAlbumDto) {
    const { picture } = file;
    return await this.albumService.create(dto, picture[0]);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.albumService.delete(id);
  }

  @Post('/addTracks')
  async addTracks(@Body() dto: AddTracksDto) {
    return await this.albumService.addTracks(dto);
  }
}
