/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Ticket } from "src/tickets/schemas/ticket.schema";

export type UserDocument = HydratedDocument<User>

@Schema()
export class User {
   @Prop()
   firstname: string

   @Prop()
   lastname: string

   @Prop()
   username: string

   @Prop()
   email: string

   @Prop()
   password: string

   @Prop()
   phone:number

   @Prop()
   country: string

   @Prop()
   birthdate: string

   @Prop()
   picture: string

   @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Ticket'}] })
   tickets: Ticket[]

   @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Notification'}] })
   notifications: Notification[]
}

export const UserSchema = SchemaFactory.createForClass(User)