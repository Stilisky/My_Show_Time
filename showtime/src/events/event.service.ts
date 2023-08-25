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

   async findById(id: string) {
      return this.eventModel.findById(id).populate("tag").populate("tickets")
   }

   async createEvent(newEvent: CreateEventDto) {
      const add = new this.eventModel(newEvent).save();
      return add;
   }

   async updateEvent(id: string, ev: UpdateEventDto) {
      return this.eventModel.findByIdAndUpdate(id, ev).exec()
   }

   async delete(id: string): Promise<Event> {
      return this.eventModel.findByIdAndDelete(id)
   }

   async getNumberOfEvent(): Promise<number> {
      return await this.eventModel.count();
   } 
   
}
