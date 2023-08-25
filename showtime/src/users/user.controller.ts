/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, Put, Res, Query, Render, Session } from '@nestjs/common';
import { Response } from 'express';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/createuser.dto';
import { User } from './schemas/user.schema';
import { UpdateUserDto } from './dto/updateUserDto';
import * as bcrypt from 'bcrypt';
//import { get } from 'superagent';

@Controller("users")
export class UserController {
   constructor(private readonly userService: UserService) { }

   //All users
   @Get()
   async getUsers() {
      return this.userService.findAllUsers();
   }

   //Count user
   @Get("/count")
   async userNumber(): Promise<number> {
      return this.userService.getNumberOfUser()
   }


   @Post('/login')
   async login( 
      @Session() session,
      @Body() existingUser: CreateUserDto,
      @Res() res: Response,
   ) {
      const { user } = await this.userService.validateUser(existingUser.email, existingUser.password);
      // Redirect to /home if login is successful
      if (user) {
         session["userId"] = user._id
         session["name"] = user.username
         session["email"] = user.email
         return res.redirect('/');
      }
      else {
         res.render('user/login', { error: 'Email or password invalid! ' });
      }
   }

   @Get('/login')
   @Render('users/login')
   getLogin(@Query('error') error: string) {
      return { error };
   }

   //Create new user
   @Post('/register')
   async saveUser(
      @Body() newuser: CreateUserDto,
      @Res() res: Response,
   ) {
      //Hash password
      const password = newuser.password;
      const saltRounds = 12;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      newuser.password = hashedPassword;

      const createdUser = await this.userService.createUser(newuser);
      // Redirect to "favTag" page upon successful registration
      if (createdUser) {
         // res.redirect('/favTag');
         res.render('login.hbs');
      } else {
         res.render('register.hbs', { errorMessage: 'Registration failed. Email or username invalid! ' });
      }
   }

   @Get(":id")
   async getUserById(@Param("id") id: string): Promise<User> {
      return this.userService.findUserById(id);
   }

   //Update user
   @Put(":id")
   async updateUser(@Param("id") id: string, @Body() upuser: UpdateUserDto): Promise<User> {
      return this.userService.updateUser(id, upuser)
   }

   //Delete User
   @Delete(":id")
   async deleteUser(@Param("id") id: string): Promise<User> {
      return this.userService.deleteUser(id)
   }
}