import { NotificationModule } from './notifications/notification.module';
import { EventModule } from './events/event.module';
import { TagModule } from './tags/tag.module';
import { TicketModule } from './tickets/ticket.module';
import { UserModule } from './users/user.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    NotificationModule,
    EventModule,
    TagModule,
    TicketModule,
    UserModule,
    MongooseModule.forRoot('mongodb://localhost/showtime'),
  ],
  controllers: [AppController],
})
export class AppModule {}
