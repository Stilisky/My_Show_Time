/* eslint-disable prettier/prettier */
/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Ticket } from './schemas/ticket.schema';
import { Model } from 'mongoose';
import { CreateTicketDto } from './dto/createTicketDto';
import { UpdateTicketDto } from './dto/updateTicketDto';

@Injectable()
export class TicketService {
   constructor(@InjectModel(Ticket.name) private ticketModel: Model<Ticket>) {}
   async findAllTickets() {
      return await this.ticketModel.find()
   }

   async findTicketById(id: string) {
      const ticket = (await (await this.ticketModel.findById(id).exec()).populate('event')).populate("user");
      return ticket;
   }

   async createTicket(addTicket: CreateTicketDto) {
      const newTicket = new this.ticketModel(addTicket).save();
      // const result = newTicket;
      return newTicket;
   }

   async updateTicket(id: string, upTicket: UpdateTicketDto) {
      return await this.ticketModel.findByIdAndUpdate(id, upTicket)
   }

   async deleteTicket(id: string){
      return this.ticketModel.findByIdAndDelete(id).exec()
   }

   async getNumberOfTicket() {
      return await this.ticketModel.count();
   }
}
