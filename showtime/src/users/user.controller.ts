/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, Put, ValidationPipe, Res, BadRequestException } from '@nestjs/common';
import { Response } from 'express';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/createuser.dto';
import { User } from './schemas/user.schema';
import { UpdateUserDto } from './dto/updateUserDto';
import * as bcrypt from 'bcrypt';

@Controller("users")
export class UserController {
   constructor(private readonly userService: UserService) { }

   //All users
   @Get()
   async getUsers() {
      return this.userService.findAllUsers();
   }

   //Create new user
   @Post('/register')
   async saveUser(
      @Body(new ValidationPipe()) newuser: CreateUserDto,
      @Res() res: Response,
   ): Promise<void> {
      const password = newuser.password;
      const saltRounds = 12;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      newuser.password = hashedPassword;

      try {
         const createdUser = await this.userService.createUser(newuser);

         // Redirect to "favTag" page upon successful registration
         if (createdUser) {
            res.redirect('/favTag');
         } else {
            throw new BadRequestException('User registration failed.');
         }
      } catch (error) {
         // Handle registration failure and display error message
         res.render('register.hbs', { errorMessage: 'Registration failed. Please try again.' });
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