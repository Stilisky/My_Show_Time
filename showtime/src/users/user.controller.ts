/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, Put, Res, Query, Render, Session, } from '@nestjs/common';
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
         session["user"] = user.email
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

   @Get('/register')
   @Render('register.hbs')
   showRegistrationForm() {
      return { errorMessage: null };
   }

   //Create new user
   @Post('/register')
   @Render('register.hbs')
   async saveUser(
      @Body() newuser: CreateUserDto,
      @Res() res: Response,
   ) {
      //Hash password
      const password = newuser.password;
      const saltRounds = 12;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      newuser.password = hashedPassword;

      const errorMessages = [];
      try {
         const createdUser = await this.userService.createUser(newuser);
         if (!createdUser) {
            errorMessages.push('Email or username is already taken');
         } else {
            // Redirect to "favTag" page upon successful registration
            // res.redirect('/favTag');
            res.redirect('login.hbs');
         }
      }
      catch (error) {
         errorMessages.push(error.message);
      }
      return { errorMessages }; // Pass the error message to the template

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