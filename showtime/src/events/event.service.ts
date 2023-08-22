/* eslint-disable prettier/prettier */

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Event } from './schemas/event.schema';
import { CreateEventDto } from './dto/createEvent.dto';
import { UpdateEventDto } from './dto/updateEvent.dto';

@Injectable()
export class EventService {
   constructor(@InjectModel(Event.name) private eventModel: Model<Event>) {}

   async findAll(): Promise<Event[]> {
      return this.eventModel.find().exec();
   }

   async findById(id: string): Promise<Event> {
      return this.eventModel.findById(id).exec()
   }

   async createEvent(newEvent: CreateEventDto): Promise<Event> {
      const add = new this.eventModel(newEvent);
      return add.save();
   }

   async updateEvent(id: string, ev: UpdateEventDto): Promise<Event> {
      return this.eventModel.findByIdAndUpdate(id, ev).exec()
   }
}
