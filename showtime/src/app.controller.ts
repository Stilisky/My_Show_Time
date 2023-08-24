/* eslint-disable prettier/prettier */
import { Controller, Get, Param, Post, Redirect, Render } from '@nestjs/common';
import { UserService } from './users/user.service';
import { TagService } from './tags/tag.service';
import { EventService } from './events/event.service';
import { TicketService } from './tickets/ticket.service';
import { NotificationService } from './notifications/notification.service';
import { AppService } from './app.service';

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
  index() {
    return {
      title: 'Home',
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
  async adminUsers() {
    const users = await this.userService.findAllUsers();
    return {users}
  }

  @Post("/promote/:id")
  @Redirect("/admin/users")
  async promote(@Param("id") id: string) {
    this.appService.promote(id)
    return Response.redirect("/admin/users");
  }

  @Post("/delete/user/:id")
  @Redirect("/admin/users")
  async delete(@Param("id") id: string) {
    this.appService.deleteuser(id)
    return Response.redirect("/admin/users");
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

  // @Post("/user/register")
  // async registerSubmit(@Body() newUser: cr){

  //}

  @Get('/login')
  @Render('login')
  login() {
    return {
      title: 'Login',
    };
  }
}
