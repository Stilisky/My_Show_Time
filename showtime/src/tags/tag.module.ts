/* eslint-disable prettier/prettier */
import { MongooseModule } from '@nestjs/mongoose';
import { TagController } from './tag.controller';
import { TagService } from './tag.service';
import { Module } from '@nestjs/common';
import { Tag, TagSchema } from './schemas/tag.schema';

@Module({
  imports: [MongooseModule.forFeature([{name:Tag.name, schema: TagSchema}])],
  controllers: [
    TagController,],
  providers: [
    TagService,],
})
export class TagModule { }
