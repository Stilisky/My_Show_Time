import { User } from 'src/users/schemas/user.schema';

/* eslint-disable prettier/prettier */
export class CreateTicketDto {
   release_date: string;
   qr_code: string;
   event: Event;
   user: User;
}