/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { Notification } from './schemas/notification.schema';

@Controller("notif")
export class NotificationController {
   constructor(private readonly notifService: NotificationService){}

   @Get()
   async getAllNotif(): Promise<Notification[]> {
      return this.notifService.findAll()
   }

   @Get(":id")
   async getNotifById(@Param("id") id: string): Promise<Notification>{
      return this.notifService.findNotifById(id)
   }

   @Post()
   async saveNotif(@Body() newnotif: Notification): Promise<Notification> {
      return this.notifService.createNotif(newnotif)
   }

   @Delete("id")
   async deleteById(@Param("id") id: string): Promise<Notification> {
      return this.notifService.deleteNotif(id)
   }
}
