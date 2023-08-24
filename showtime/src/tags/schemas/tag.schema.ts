/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Event } from "src/events/schemas/event.schema";
import { User } from "src/users/schemas/user.schema";

export type TagDocument = HydratedDocument<Tag>

@Schema()
export class Tag {
   @Prop({required: true})
   name: string

   @Prop()
   picture: string

   @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}] })
   users: User[]

   @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Event'}] })
   events: Event[]

}

export const TagSchema = SchemaFactory.createForClass(Tag)