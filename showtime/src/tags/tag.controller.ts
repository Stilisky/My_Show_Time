/* eslint-disable prettier/prettier */

import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { TagService } from './tag.service';
import { Tag } from './schemas/tag.schema';
import { CreateTagDto } from './dto/createTagDto.dto';
import { UpdateTagDto } from './dto/updateTagDto.dto';

@Controller("tags")
export class TagController {
   constructor(private readonly tagService: TagService){}

   @Get()
   async getTags(): Promise<Tag[]> {
      return this.tagService.findTags();
   }

   @Get(":id")
   async getTagById(@Param("id") id: string): Promise<Tag> {
      return this.tagService.findTag(id);
   }

   @Post()
   async saveTag(@Body() newTag: CreateTagDto): Promise<Tag> {
      return this.tagService.createTag(newTag);
   }

   @Put("id")
   async updateTag(@Param("id") id: string, @Body() upTag: UpdateTagDto): Promise<Tag> {
      return this.tagService.updateTag(id, upTag)
   }

   @Delete("id")
   async deleteTag(@Param("id") id: string): Promise<Tag> {
      return this.tagService.deleteTag(id);
   }
   
}
