/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { User } from "src/users/schemas/user.schema";

export type NotificationDocument = HydratedDocument<Notification>

@Schema()
export class Notification {
   @Prop({required: true})
   subject: string

   @Prop({required: true})
   message: string

   @Prop({default: Date.now()})
   release_date: string

   @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}] })
   users: User[]

}

export const NotificationSchema = SchemaFactory.createForClass(Notification)