/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Post, Render, Res, Session } from '@nestjs/common';
import { UserService } from './users/user.service';
import { TagService } from './tags/tag.service';
import { EventService } from './events/event.service';
import { TicketService } from './tickets/ticket.service';
import { NotificationService } from './notifications/notification.service';
import { AppService } from './app.service';
import { Response } from 'express';
import { UpdateTagDto } from './tags/dto/updateTagDto.dto';

@Controller()
export class AppController {
  constructor(
    private readonly userService: UserService,
    private readonly tagService: TagService,
    private readonly eventService: EventService,
    private readonly ticketService: TicketService,
    private readonly notifService: NotificationService,
    private readonly appService: AppService,
  ) {}
  @Get('/')
  @Render('index')
  index(@Session() session) {
    const user = session.user;
    console.log(session);
    return {
      title: 'Home',
      user: user,
    };
  }
  @Get('/usersDashboard')
  @Render('usersDashboard')
  usersDashboard() {
    return {
      title: 'Dashboard',
    };
  }
  @Get('/ticketdetails')
  @Render('ticketdetails')
  ticketdetails() {
    return {
      title: 'Dashboard',
    };
  }
  @Get('/searchpage')
  @Render('searchpage')
  searchpage() {
    return {
      title: 'Dashboard',
    };
  }
  @Get('/favtags')
  @Render('favtags')
  favtags() {
    return {
      title: 'favtags',
    };
  }

  @Get("/dashboard")
  @Render("dash")
  async dashboard() {
    const userNumbers = await this.userService.getNumberOfUser();
    const tagNumbers = await this.tagService.getNumberOfTag();
    const ticketNumbers = await this.ticketService.getNumberOfTicket();
    const eventNumbers = await this.eventService.getNumberOfEvent();
    const allTags = await this.tagService.findTags();
    const tagname = [];
    const tagusers = [];
    allTags.forEach(element => {
      tagname.push(element.name);
      tagusers.push(element.users.length)
    });
    return {userNumbers, tagNumbers, ticketNumbers, eventNumbers, tagname, tagusers}
  }

  @Get("tag/:tag_id/user/:user_id")
  async addUserToTag(@Param("tag_id") tag_id: string, @Param("user_id") user_id: string) {
    return this.appService.addUserToTag(tag_id, user_id)
  }

  @Get("tag/:tag_id/event/:event_id")
  async addEventToTag(@Param("tag_id") tag_id: string, @Param("event_id_id") event_id: string) {
    return this.appService.addEventToTag(tag_id, event_id)
  }

  @Get("/admin/users")
  @Render('adminusers')
  async adminUser() {
    const users = await this.userService.findAllUsers();
    return {users}
  }

  @Get("/admin/tags")
  @Render('admintags')
  async adminTags() {
    const tags = await this.tagService.findTags()
    return {tags}
  }

  @Post("/promote/:id")
  async promote(@Param("id") id: string, @Res() res: Response) {
    this.appService.promote(id)
    // const users = await this.userService.findAllUsers();
    res.render("adminusers.hbs")
  }

  @Post("/delete/user/:id")
  async delete(@Param("id") id: string, @Res() res: Response) {
    await this.appService.deleteuser(id)
    const users = await this.userService.findAllUsers();
    res.render("adminusers.hbs", {users})
  }

  @Get("/update/tag/:id")
  @Render("updateTag.hbs")
  async updateTag(@Param("id") id: string) {
    const tag = this.tagService.findTag(id)
    // const users = await this.userService.findAllUsers();
    return {tag}
  }

  @Post("/update/tag/:id")
  async updateTagP(@Param("id") id: string, @Body() upTag: UpdateTagDto, @Res() res: Response) {
    await this.tagService.updateTag(id, upTag)
    const tags = await this.tagService.findTags();
    res.render("admintags.hbs", {tags})
  }

  @Post("/delete/tag/:id")
  async deleteTag(@Param("id") id: string, @Res() res: Response) {
    this.tagService.deleteTag(id)
    const tags = await this.tagService.findTags();
    res.render("admintags.hbs", {tags})
  }

  @Get("/admin/events")
  @Render('adminevents')
  async adminEvents() {
    const events = await this.eventService.findAll()
    return {events}
  }

  @Get('/register')
  @Render('register')
  register() {
    return {
      title: 'Register',
    };
  }

  @Get('/login')
  @Render('login')
  login() {
    return {
      title: 'Login',
    };
  }
  
}
