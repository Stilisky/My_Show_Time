import { Body, Controller, Get, Post, Render } from '@nestjs/common';

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
