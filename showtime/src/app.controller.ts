import { Controller, Get, Render } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('/')
  @Render('index')
  index() {
    return {
      title: 'Home Page - Online Store',
    };
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
