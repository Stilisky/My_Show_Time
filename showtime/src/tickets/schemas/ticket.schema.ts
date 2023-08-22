/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Tag } from "src/tags/schemas/tag.schema";

export type TicketDocument = HydratedDocument<Ticket>

@Schema()
export class Ticket {
   @Prop()
   release_date: string

   @Prop()
   qr_code: string

   @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Tag'}] })
   tag: Tag

   @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Ticket'}] })
   tickets: Ticket[]
}

export const TicketSchema = SchemaFactory.createForClass(Ticket)