/* eslint-disable prettier/prettier */

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Notification } from './schemas/notification.schema';
import { Model } from 'mongoose';
import { CreateNotifDto } from './dto/notif.dto';

@Injectable()
export class NotificationService {
   constructor(@InjectModel(Notification.name) private notifModel: Model<Notification>){}

   async findNotifById(id: string) {
      return (await this.notifModel.findById(id).exec()).populate("user")
   }

   async findAll(){
      return this.notifModel.find().exec()
   }

   async createNotif(newNotif: CreateNotifDto) {
      const notif = new this.notifModel( newNotif)
      return notif.save();
   }

   async deleteNotif(id: string){
      return this.notifModel.findByIdAndDelete(id).exec();
   }

   async getNumberOfNotif(): Promise<number> {
      return await this.notifModel.count();
   }   
   
}
