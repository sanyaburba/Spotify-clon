import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { Album } from './models/album.model';
import { Track } from '../track/models/track.model';
import { FileService, FileType } from '../file/file.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { AddTracksDto } from './dto/add-tracks.dto';

@Injectable()
export class AlbumService {
  constructor(
    @InjectModel(Album)
    private albumModel: typeof Album,
    @InjectModel(Track)
    private trackModel: typeof Track,
    private fileService: FileService,
  ) {}

  async getAll(count = 10, offset = 0): Promise<Album[]> {
    return this.albumModel.findAll({
      offset: offset,
      limit: count,
      order: ['id'],
      include: [{ model: Track, attributes: ['id'] }],
    });
  }

  async getOne(id: number): Promise<Album> {
    return this.albumModel.findOne({
      where: { id },
      include: { model: Track },
    });
  }

  async search(searchQuery: string): Promise<Album[]> {
    return this.albumModel.findAll({
      where: {
        [Op.or]: [
          { name: { [Op.iLike]: '%' + searchQuery + '%' } },
          { artist: { [Op.iLike]: '%' + searchQuery + '%' } },
        ],
      },
    });
  }

  async create(dto: CreateAlbumDto, picture): Promise<Album> {
    const picturePath = this.fileService.createFile(FileType.IMAGE, picture);
    const album = await this.albumModel.create({
      ...dto,
      picture: picturePath,
    });
    // const track = await this.trackModel.findOne({
    //   where: { id: dto.originalTrack },
    // });
    // await album.$set('tracks', [track]);
    // album.tracks = [track];
    return album;
  }

  async delete(id: number): Promise<void> {
    const album = await this.albumModel.findOne({ where: { id } });
    await album.destroy();
  }

  async addTracks(dto: AddTracksDto): Promise<void> {
    const album = await this.albumModel.findOne({
      where: { id: +dto.albumId },
      include: { model: Track },
    });
    dto.tracks.forEach((track) => album.$add('tracks', [track]));
    await album.save();
  }
  // async listen(id: number): Promise<void> {
  //   const album = await this.albumModel.findOne({ where: { id } });
  //   album.listens += 1;
  //   await album.save();

  // }
}
