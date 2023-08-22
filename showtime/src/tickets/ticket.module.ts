/* eslint-disable prettier/prettier */
import { MongooseModule } from '@nestjs/mongoose';
import { TicketController } from './ticket.controller';
import { TicketService } from './ticket.service';
import { Module } from '@nestjs/common';
import { TicketSchema, Ticket } from './schemas/ticket.schema';

@Module({
    imports: [MongooseModule.forFeature([{name:Ticket.name, schema: TicketSchema}])],
    controllers: [
        TicketController,],
    providers: [
        TicketService,],
})
export class TicketModule { }
