/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type NotificationDocument = HydratedDocument<Notification>

@Schema()
export class Notification {
   @Prop()
   message: string

   @Prop()
   release_date: string

}

export const NotificationSchema = SchemaFactory.createForClass(Notification)