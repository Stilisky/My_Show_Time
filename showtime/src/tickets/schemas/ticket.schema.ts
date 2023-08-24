/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Event } from "src/events/schemas/event.schema";
import { User } from "src/users/schemas/user.schema";

export type TicketDocument = HydratedDocument<Ticket>

@Schema()
export class Ticket {
   @Prop({default: Date.now()})
   release_date: string

   @Prop()
   qr_code: string

   @Prop({default: true})
   is_valid: boolean

   @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}], required: true })
   user: User

   @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Event'}], required: true })
   event: Event
}

export const TicketSchema = SchemaFactory.createForClass(Ticket)