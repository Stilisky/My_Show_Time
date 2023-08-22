/* eslint-disable prettier/prettier */
export class CreateTicketDto {
   release_date: string;
   qr_code: string;
   event: Event;
   user: string;
   password: string;
   phone: string;
   country: string;
   birthday: string;
   picture: string;
   is_admin: string;
}