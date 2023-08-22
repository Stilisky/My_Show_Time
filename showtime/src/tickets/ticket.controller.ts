/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { CreateTicketDto } from './dto/createTicketDto';
import { Ticket } from './schemas/ticket.schema';

@Controller("tickets")
export class TicketController {
   constructor(private readonly ticketServive: TicketService) {}

   @Get()
   async getTickets() {
      return this.ticketServive.findAllTickets()
   }

   @Post()
   async saveTicket(@Body() newTicket: CreateTicketDto): Promise<Ticket> {
      return this.ticketServive.createTicket(newTicket);
   }

   @Get(":id")
   async getTicketById(@Param("id") id: string): Promise<Ticket> {
      return this.ticketServive.findTicketById(id)
   }

   @Delete(":id")
   async deleteTicket(@Param("id") id: string): Promise<Ticket> {
      return this.ticketServive.deleteTicket(id)
   }




}
