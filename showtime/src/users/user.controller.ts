/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/createuser.dto';
import { User } from './schemas/user.schema';
import { UpdateUserDto } from './dto/updateUserDto';

@Controller("users")
export class UserController {
constructor(private readonly userService: UserService) {}

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

   //Create new user
   @Post()
   async saveUser(@Body() newuser: CreateUserDto): Promise<User> {
      return this.userService.createUser(newuser);
   }

   //Find user by id
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
