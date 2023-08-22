/* eslint-disable prettier/prettier */
import { MongooseModule } from '@nestjs/mongoose';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
import { Module } from '@nestjs/common';
import { Notification, NotificationSchema } from './schemas/notification.schema';

@Module({
    imports: [MongooseModule.forFeature([{name: Notification.name, schema: NotificationSchema}])],
    controllers: [
        NotificationController,],
    providers: [
        NotificationService,],
})
export class NotificationModule { }
