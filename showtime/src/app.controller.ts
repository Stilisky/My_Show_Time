import { Controller, Get, Render } from '@nestjs/common';

@Controller()
export class AppController {
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
}
