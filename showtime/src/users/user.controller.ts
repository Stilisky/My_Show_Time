/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Render,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/createuser.dto';
import { User } from './schemas/user.schema';
import { UpdateUserDto } from './dto/updateUserDto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  //All users
  @Get()
  async getUsers() {
    return this.userService.findAllUsers();
  }

  //Create new user
  @Post()
  async saveUser(@Body() newuser: CreateUserDto): Promise<User> {
    return this.userService.createUser(newuser);
  }

  //User account information
  @Get('/info')
  @Render('accountinfo')
  async accountinfo() {
    // Id de l'utilisateur connecté user_id
    const user_id = '64e6492237b87cafac0b4a83';
    //Utilisateur ayant l'id
    const userFind = await this.userService.findUserById(user_id);
    return {
      userFind: userFind,
    };
  }

  //Find user by id
  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<User> {
    return this.userService.findUserById(id);
  }

  //Update user
  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() upuser: UpdateUserDto,
  ): Promise<User> {
    return this.userService.updateUser(id, upuser);
  }

  //Delete User
  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<User> {
    return this.userService.deleteUser(id);
  }
}
