/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Tag } from "src/tags/schemas/tag.schema";
import { Ticket } from "src/tickets/schemas/ticket.schema";

export type EventDocument = HydratedDocument<Event>

@Schema()
export class Event {
   @Prop()
   name: string

   @Prop()
   description: string

   @Prop()
   release_date: string

   @Prop()
   picture: string

   @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Ticket'}] })
   tickets: Ticket[]

   @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Tag'}] })
   tag: Tag
}

export const EventSchema = SchemaFactory.createForClass(Event)