/* eslint-disable prettier/prettier */
/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/createuser.dto';
import { UpdateUserDto } from './dto/updateUserDto';

@Injectable()
export class UserService {
   constructor(@InjectModel(User.name) private userModel: Model<User>){}

   async createUser(usercreate: CreateUserDto): Promise<User> {
      const newuser = new this.userModel(usercreate)
      return await newuser.save();
   }

   async findAllUsers(): Promise<User[]> {
      return await this.userModel.find().exec();
   }

   async findUserById(id: string): Promise<User> {
      return await this.userModel.findById(id).exec();
   }

   async updateUser(id: string, userupdt: UpdateUserDto): Promise<User> {
      const upUser = await this.userModel.findByIdAndUpdate(id, userupdt)
      return upUser;
   }

   async deleteUser(id: string): Promise<User> {
      return await this.userModel.findByIdAndDelete(id);
   }

}
