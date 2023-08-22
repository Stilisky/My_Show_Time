/* eslint-disable prettier/prettier */
import { Controller, Get } from '@nestjs/common';

@Controller("users")
export class TicketController {
   @Get()
   getusers() {
      return "alluser work"
   }
}
