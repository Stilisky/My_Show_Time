/* eslint-disable prettier/prettier */
import { Injectable, Param } from '@nestjs/common';
import { TagService } from './tags/tag.service';
import { UserService } from './users/user.service';
import { Tag } from './tags/schemas/tag.schema';
import { EventService } from './events/event.service';
import { UpdateUserDto } from './users/dto/updateUserDto';
import { User } from './users/schemas/user.schema';
import { Ticket } from './tickets/schemas/ticket.schema';

@Injectable()
export class AppService {
  constructor(
    private readonly tagServ: TagService,
    private readonly userServ: UserService,
    private readonly eventServ: EventService
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

  async addEventToTag(@Param("tag_id") tag_id: string, @Param("event_id") event_id: string): Promise<Tag> {
    const tag = await this.tagServ.findTag(tag_id)
    const event = await this.eventServ.findById(event_id)
    tag.events.push(event)
    const tagup = await this.tagServ.updateTag(tag_id, tag)
    return tagup
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

  // async bookConcertTicket(@Param("event_id") event_id: string, @Param("user_id") user_id: string): Promise<Ticket> {

  // }
}
