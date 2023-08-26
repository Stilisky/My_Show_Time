/* eslint-disable prettier/prettier */
import { Injectable, Param } from '@nestjs/common';
import { TagService } from './tags/tag.service';
import { UserService } from './users/user.service';
import { Tag } from './tags/schemas/tag.schema';
import { EventService } from './events/event.service';
import { UpdateUserDto } from './users/dto/updateUserDto';
import { User } from './users/schemas/user.schema';
// import { Ticket } from './tickets/schemas/ticket.schema';
import { CreateTicketDto } from './tickets/dto/createTicketDto';
import { TicketService } from './tickets/ticket.service';
import { UpdateTicketDto } from './tickets/dto/updateTicketDto';
import { Notification } from './notifications/schemas/notification.schema';

@Injectable()
export class AppService {
  constructor(
    private readonly tagServ: TagService,
    private readonly userServ: UserService,
    private readonly eventServ: EventService,
    private readonly ticketServ: TicketService,
  ) {}
  
  getHello(): string {
    return 'Hello World!';
  }

  async addUserToTag(@Param("tag_id") tag_id: string, @Param("user_id") user_id: string): Promise<Tag> {
    const tag = await this.tagServ.findTag(tag_id)
    const user = await this.userServ.findUserById(user_id)
    tag.users.push(user)
    const tagup = await this.tagServ.updateTag(tag_id, tag)
    return tagup
  }

  async addEventToTag(@Param("tag_id") tag_id: string, @Param("event_id") event_id: string) {
    const tag = await this.tagServ.findTag(tag_id)
    const event = await this.eventServ.findById(event_id)
    tag.events.push(event)
    const tagup = await this.tagServ.updateTag(tag_id, tag)
    return tagup
  }

  async addTagToEvent(@Param("event_id") event_id: string, @Param("tag_id") tag_id: string) {
    const tag = await this.tagServ.findTag(tag_id)
    const event = await this.eventServ.findById(event_id)
    tag.events.push(event)
    const tagup = await this.tagServ.updateTag(tag_id, tag)
    return tagup
  }

  async addTicketToEvent(@Param("tick_id") tick_id: string, @Param("event_id") event_id: string) {
    const ticket = await this.ticketServ.findTicketById(tick_id);
    const event = await this.eventServ.findById(event_id)
    event.tickets.push(ticket)
    this.eventServ.updateEvent(event_id, event)
  }

  async addTicketToUser(@Param("tick_id") tick_id: string, @Param("user_id") user_id: string) {
    const ticket = await this.ticketServ.findTicketById(tick_id);
    const user = await this.userServ.findUserById(user_id)
    user.tickets.push(ticket)
    this.userServ.updateUser(user_id, user)
  }

  async promote(@Param("id") id: string): Promise<User> {
    const user = await this.userServ.findUserById(id);
    if (user.is_admin == false) {
      user.is_admin = true;
    } else {
      user.is_admin = false;
    }
    let newuser = new UpdateUserDto();
    newuser = user
    return await this.userServ.updateUser(id, newuser)
  }
  
  async deleteuser(@Param("id") id: string): Promise<User> {
    return await this.userServ.deleteUser(id)
  }

  async status(@Param("id") id: string) {
    const event = await this.eventServ.findById(id)
    if(event.status) {
      event.status = false
    } else {
      event.status = true
    }
    this.eventServ.updateEvent(id, event)
  }

  async bookConcertTicket(@Param("event_id") event_id: string, @Param("user_id") user_id: string) {
    const event = await this.eventServ.findById(event_id);
    const user = await this.userServ.findUserById(user_id);
    // console.log(event + "\n" + user);
    
    const createTicketDto = new CreateTicketDto();
    createTicketDto.user = user;
    createTicketDto.event = event;

    const ticket = await this.ticketServ.createTicket(createTicketDto);
    const id = ticket._id.toHexString()
    // console.log(ticket);
     
    const tickup = new UpdateTicketDto
    tickup.event = ticket.event
    tickup.qr_code = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=http://localhost:3000/ticketdetails/" + id + "alphas"
    tickup.user = ticket.user
    tickup.release_date = ticket.release_date
    const up = await this.ticketServ.updateTicket(id,tickup);
    // console.log(up);
    this.addTicketToEvent(id, event_id);
    this.addTicketToUser(id, user_id);
    return up;
  }

  async sendNotification(user_id:string, notif: Notification) {
    const user = await this.userServ.findUserById(user_id);
    user.notifications.push(notif)
    this.userServ.updateUser(user_id, user)
  }
}
