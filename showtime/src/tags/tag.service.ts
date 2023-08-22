/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Tag } from './schemas/tag.schema';
import { Model } from 'mongoose';
import { CreateTagDto } from './dto/createTagDto.dto';
import { UpdateTagDto } from './dto/updateTagDto.dto';

@Injectable()
export class TagService {
   constructor(@InjectModel(Tag.name) private tagModel: Model<Tag>) {}

   async findTags(): Promise<Tag[]> {
      return this.tagModel.find().exec();
   }

   async findTag(id: string): Promise<Tag> {
      return this.tagModel.findById(id);
   }

   async createTag(newTag: CreateTagDto): Promise<Tag> {
      const addtag = new this.tagModel(newTag);
      return addtag.save();
   }

   async updateTag(id: string, uptag: UpdateTagDto): Promise<Tag> {
      return await this.tagModel.findByIdAndUpdate(id, uptag).exec();
   }

   async deleteTag(id: string): Promise<Tag> {
      return this.tagModel.findByIdAndDelete(id).exec();
   }
}
