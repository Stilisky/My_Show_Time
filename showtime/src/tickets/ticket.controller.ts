/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { CreateTicketDto } from './dto/createTicketDto';
import { Ticket } from './schemas/ticket.schema';

@Controller("tickets")
export class TicketController {
   constructor(private readonly ticketServive: TicketService) {}

   @Get()
   async getusers() {
      return this.ticketServive.findAllTickets()
   }

   @Post()
   async saveUser(@Body() newTicket: CreateTicketDto): Promise<Ticket> {
      return this.ticketServive.createTicket(newTicket);
   }


}
