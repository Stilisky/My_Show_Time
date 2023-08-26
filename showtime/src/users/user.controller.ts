/* eslint-disable prettier/prettier */
// import { Body, Controller, Delete, Get, Param, Put, Query, Render } from '@nestjs/common';
import { Controller } from '@nestjs/common';
// import { UserService } from './user.service';
// import { User } from './schemas/user.schema';
// import { UpdateUserDto } from './dto/updateUserDto';

@Controller()
export class UserController {
   // constructor(private readonly userService: UserService) { }

  //All users
//   @Get()
//   async getUsers() {
//     return this.userService.findAllUsers();
//   }

   //Count user
   // @Get("/count")
   // async userNumber(): Promise<number> {
   //    return this.userService.getNumberOfUser()
   // }


   // @Get('/login')
   // @Render('users/login')
   // getLogin(@Query('error') error: string) {
   //    return { error };
   // }

   // @Get(":id")
   // async getUserById(@Param("id") id: string): Promise<User> {
   //    return this.userService.findUserById(id);
   // }

   // //Update user
   // @Put(":id")
   // async updateUser(@Param("id") id: string, @Body() upuser: UpdateUserDto): Promise<User> {
   //    return this.userService.updateUser(id, upuser)
   // }

   // //Delete User
   // @Delete(":id")
   // async deleteUser(@Param("id") id: string): Promise<User> {
   //    return this.userService.deleteUser(id)
   // }

}

