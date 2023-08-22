/* eslint-disable prettier/prettier */
/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Ticket } from './schemas/ticket.schema';
import { Model } from 'mongoose';
import { CreateTicketDto } from './dto/createTicketDto';

@Injectable()
export class TicketService {
   constructor(@InjectModel(Ticket.name) private ticketModel: Model<Ticket>) {}
   async findAllTickets(): Promise<Ticket[]> {
      return await this.ticketModel.find()
   }

   async findTicketById(id: string): Promise<Ticket> {
      const ticket = this.ticketModel.findById(id).exec();
      return ticket;
   }

   async createTicket(addTicket: CreateTicketDto): Promise<Ticket>{
      const newTicket = new this.ticketModel(addTicket);
      return newTicket;
   }

}
