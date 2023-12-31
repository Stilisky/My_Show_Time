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

   async findTags() {
      return this.tagModel.find().exec()
   }

   async findTag(id: string){
      return (await (await this.tagModel.findById(id).exec()).populate("users")).populate("events")
   }

   async createTag(newTag: CreateTagDto) {
      const addtag = new this.tagModel(newTag).save();
      return addtag;
   }

   async updateTag(id: string, uptag: UpdateTagDto) {
      return await this.tagModel.findByIdAndUpdate(id, uptag).exec();
   }

   async deleteTag(id: string): Promise<Tag> {
      return this.tagModel.findByIdAndDelete(id).exec();
   }

   async getNumberOfTag(): Promise<number> {
      return await this.tagModel.count();
   }
}
