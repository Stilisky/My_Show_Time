import { Event } from 'src/events/schemas/event.schema';
import { User } from 'src/users/schemas/user.schema';

/* eslint-disable prettier/prettier */
export class UpdateTicketDto {
   release_date: string;
   qr_code: string;
   event: Event;
   user: User;
}