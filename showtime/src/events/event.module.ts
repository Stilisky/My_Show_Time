/* eslint-disable prettier/prettier */
import { MongooseModule } from '@nestjs/mongoose';
import { EventController } from './event.controller';
import { EventService } from './event.service';
import { Module } from '@nestjs/common';
import { EventSchema } from './schemas/event.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: Event.name, schema: EventSchema}])],
  controllers: [
    EventController,],
  providers: [
    EventService,],
  exports: [
    EventService,
  ],
})
export class EventModule { }
