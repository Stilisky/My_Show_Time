/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { EventService } from './event.service';
import { Event } from './schemas/event.schema';
import { CreateEventDto } from './dto/createEvent.dto';
import { UpdateEventDto } from './dto/updateEvent.dto';

@Controller("events")
export class EventController {
   constructor(private readonly eventService: EventService){}

   @Get()
   async getEvents(): Promise<Event[]> {
      return this.eventService.findAll()
   }

   @Get(":id")
   async getEventById(@Param("id") id: string): Promise<Event> {
      return this.eventService.findById(id)
   }

   @Post()
   async saveEvent(@Body() request: CreateEventDto): Promise<Event> {
      return this.eventService.createEvent(request)
   }

   @Put(":id")
   async updateEvent(@Param("id") id: string, @Body() request: UpdateEventDto): Promise<Event> {
      return this.eventService.updateEvent(id, request)
   }

   @Delete("id")
   async deleteEvent(@Param("id") id: string): Promise<Event> {
      return this.eventService.delete(id)
   }

}
