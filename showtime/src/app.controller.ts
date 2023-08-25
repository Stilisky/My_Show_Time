/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Post, Render, Res, Redirect, Session } from '@nestjs/common';
import { UserService } from './users/user.service';
import { TagService } from './tags/tag.service';
import { EventService } from './events/event.service';
import { TicketService } from './tickets/ticket.service';
import { NotificationService } from './notifications/notification.service';
import { AppService } from './app.service';
import { UpdateTagDto } from './tags/dto/updateTagDto.dto';
import { CreateEventDto } from './events/dto/createEvent.dto';
import { UpdateEventDto } from './events/dto/updateEvent.dto';
import { CreateTagDto } from './tags/dto/createTagDto.dto';

@Controller()
export class AppController {
  constructor(
    private readonly userService: UserService,
    private readonly tagService: TagService,
    private readonly eventService: EventService,
    private readonly ticketService: TicketService,
    private readonly notifService: NotificationService,
    private readonly appService: AppService,
  ) { }
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
  @Get('/eventsdetails')
  @Render('eventsdetails')
  eventsdetails() {
    return {
      title: 'Event Details',
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
      title: 'All event',
    };
  }

  @Get('/searchresultpage')
  @Render('searchresultpage')
  searchresultpage() {
    return {
      title: 'Search Result',
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
    return { userNumbers, tagNumbers, ticketNumbers, eventNumbers, tagname, tagusers }
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
    return { users }
  }

  @Get("/admin/tags")
  @Render('admintags')
  async adminTags() {
    const tags = await this.tagService.findTags()
    return {tags}
  }

  @Post("/promote/:id")
  @Redirect('/admin/users')
  async promote(@Param("id") id: string) {
    this.appService.promote(id)
    const users = await this.userService.findAllUsers();
    return {users}
  }

  @Post("/delete/user/:id")
  @Redirect('/admin/users')
  async delete(@Param("id") id: string) {
    await this.appService.deleteuser(id)
    const users = await this.userService.findAllUsers();
    return {users}
  }

  @Get("/update/tag/:id")
  @Render("updatetag")
  async updateTag(@Param("id") id: string) {
    const tag = await this.tagService.findTag(id);
    return {tag}
  }

  @Post("/update/tag/:id")
  @Redirect('/admin/tags')
  async updateTagP(@Param("id") id: string, @Body() upTag: UpdateTagDto) {
    await this.tagService.updateTag(id, upTag)
    const tags = await this.tagService.findTags();
    return {tags}
  }

  @Get("/update/event/:id")
  @Render("updateevent.hbs")
  async updateEvent(@Param("id") id: string) {
    const event = await this.eventService.findById(id)
    const tags = await this.tagService.findTags()
    return {event, tags}
  }

  @Post("/update/event/:id")
  @Redirect('/admin/events')
  async updateEventSubP(@Param("id") id: string, @Body() upEvt: UpdateEventDto) {
    await this.eventService.updateEvent(id, upEvt)
    const events = await this.eventService.findAll()
    return {events}
  }

  @Post("/delete/event/:id")
  @Redirect('/admin/events')
  async deleteEvent(@Param("id") id: string) {
    this.eventService.delete(id)
    const events = await this.eventService.findAll();
    return {events}
  }

  @Post("/delete/tag/:id")
  @Redirect('/admin/tags')
  async deleteTag(@Param("id") id: string) {
    this.tagService.deleteTag(id)
    const tags = await this.tagService.findTags();
    return {tags}
  }

  @Get("/new/event")
  @Render('addevent.hbs')
  async eventform() {
    const tags = await this.tagService.findTags()
    return {tags}; 
  }

  @Post("/new/event")
  @Redirect('/admin/events')
  async eventsubmit(@Body() addevent: CreateEventDto) {
    this.eventService.createEvent(addevent);
    //add event to tag
    const events = await this.eventService.findAll()
    return {events}
  }

  @Get("/new/tag")
  @Render('addtag.hbs')
  async tagform() {}

  @Post("/new/tag")
  @Redirect('/admin/tags')
  async tagsubmit(@Body() addtag: CreateTagDto) {
    this.tagService.createTag(addtag)
    const tags = await this.tagService.findTags()
    return {tags}
  }

  @Post("/event/status/:id")
  @Redirect("/admin/events")
  async eventStatus(@Param("id") id: string) {
    this.appService.status(id)
    const events = await this.eventService.findAll()
    return {events}
  }

  @Get("/admin/events")
  @Render('adminevents')
  async adminEvents() {
    const events = await this.eventService.findAll()
    return { events }
  }

  @Get('/register')
  @Render('register')
  register() {
    return {
      title: 'Register',
    };
  }
  @Get('/addevent')
  @Render('addevent')
  addevent() {
    return {
      title: 'Add event',
    };
  }

  @Get('/notification')
  @Render('notification')
  notification() {
    return {
      title: 'Notification',
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

  @Get('/toktok')
  async toktok() {
    return await this.appService.bookConcertTicket("64e6d53db7e27d163ba0b56c", "64e73b797a0b200af27533f4")
  }
}
