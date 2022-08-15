import { Injectable } from '@nestjs/common';
import { Track } from './models/track.model';
import { Comment } from './models/comment.model';
import { CreateTrackDto } from './dto/create-track.dto';
import { InjectModel } from '@nestjs/sequelize';
import { CreateCommentDto } from './dto/create-comment.dto';
import { FileService, FileType } from '../file/file.service';
import { Op } from 'sequelize';

@Injectable()
export class TrackService {
  constructor(
    @InjectModel(Track)
    private trackModel: typeof Track,
    @InjectModel(Comment)
    private commentModel: typeof Comment,
    private fileService: FileService,
  ) {}

  async create(dto: CreateTrackDto, picture, audio): Promise<Track> {
    const audioPath = this.fileService.createFile(FileType.AUDIO, audio);
    const picturePath = this.fileService.createFile(FileType.IMAGE, picture);
    return await this.trackModel.create({
      ...dto,
      listens: 0,
      audio: audioPath,
      picture: picturePath,
    });
  }

  async remove(id: number): Promise<void> {
    const track = await this.trackModel.findOne({ where: { id } });
    await track.destroy();
  }

  async getAll(count = 10, offset = 0): Promise<Track[]> {
    return this.trackModel.findAll({
      offset: offset,
      limit: count,
      order: ['id'],
      include: [{ model: Comment, attributes: ['id'] }],
    });
  }

  async getOne(id: number): Promise<Track> {
    return this.trackModel.findOne({
      where: { id },
      include: { model: Comment },
    });
  }

  async addComment(dto: CreateCommentDto): Promise<Comment> {
    const track = await this.trackModel.findOne({ where: { id: dto.trackId } });
    const comment = await this.commentModel.create({ ...dto });
    await track.save();
    return comment;
  }

  async listen(id: number): Promise<void> {
    const track = await this.trackModel.findOne({ where: { id } });
    track.listens += 1;
    await track.save();
  }

  async search(searchQuery: string): Promise<Track[]> {
    return this.trackModel.findAll({
      where: { name: { [Op.iLike]: '%' + searchQuery + '%' } },
    });
  }
}
