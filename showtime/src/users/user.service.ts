/* eslint-disable prettier/prettier */
/*
https://docs.nestjs.com/providers#services
*/

import { Injectable, ConflictException, BadRequestException } from '@nestjs/common';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/createuser.dto';
import { UpdateUserDto } from './dto/updateUserDto';

@Injectable()
export class UserService {
   constructor(@InjectModel(User.name) private readonly userModel: Model<User>) { }

   async createUser(createUserDto: CreateUserDto): Promise<User> {
      const { email, username, phone } = createUserDto;

      // Check email format using regex
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(email)) {
         throw new BadRequestException('Invalid email format. Please provide a valid email address.');
      }

      // Check username format using regex (alphanumeric characters only)
      const usernameRegex = /^[a-zA-Z0-9]+$/;
      if (!usernameRegex.test(username)) {
         throw new BadRequestException('Invalid username format. Use only alphanumeric characters.');
      }

      // Check phone format using regex (numeric characters only)
      const phoneRegex = /^[0-9]+$/;
      if (!phoneRegex.test(phone)) {
         throw new BadRequestException('Invalid phone number format. Provide a valide phone number.');
      }

      // Check if email or username already exist
      const existingUser = await this.userModel.findOne({ $or: [{ email }, { username }] }).exec();
      if (existingUser) {
         throw new ConflictException('Email or username is already taken');
      }

      // Check if phone number already exists
      const existingPhone = await this.userModel.findOne({ phone }).exec();
      if (existingPhone) {
         throw new ConflictException('Phone number is already taken');
      }

      const createdUser = new this.userModel(createUserDto);
      return createdUser.save();
   }

   async getUserByEmail(email: string): Promise<User | null> {
      const user = await this.userModel.findOne({ email }).exec();
      return user || null;
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

   async getNumberOfUser(): Promise<number> {
      return await this.userModel.count();
   }

}
