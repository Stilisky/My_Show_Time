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
import * as bcrypt from 'bcrypt';
//import { log } from 'console';

@Injectable()
export class UserService {
   constructor(@InjectModel(User.name) private readonly userModel: Model<User>) { }

   async createUser(createUserDto: CreateUserDto) {
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
         throw new BadRequestException('Invalid phone number format. Provide a valid phone number.');
      }

      // Check if email, username, or phone number already exist
      const existingUser = await this.userModel.findOne({ $or: [{ email }, { username }, { phone }] }).exec();
      if (existingUser) {
         if (existingUser.email === email) {
            throw new ConflictException('Email is already taken');
         }
         if (existingUser.username === username) {
            throw new ConflictException('Username is already taken');
         }
         if (existingUser.phone === phone) {
            throw new ConflictException('Phone number is already taken');
         }
      }

      const createdUser = new this.userModel(createUserDto).save();
      return createdUser;
   }

   async validateUser(email: string, password: string) {

      try {
         const user = await this.userModel.findOne({ email }).exec();

         if (!user) {
            return { user: null, error: 'User not found' };
         }

         const passwordMatch = await bcrypt.compare(password, user.password);

         if (!passwordMatch) {
            return { user: null, error: 'Invalid credentials' };
         }

         return { user, error: null };
      } catch (error) {
         throw new Error('An error occurred while processing your request');
      }
   }

   async getUserByEmail(email: string): Promise<User | null> {
      const user = await this.userModel.findOne({ email }).exec();
      return user || null;
   }

   async findAllUsers(): Promise<User[]> {
      return await this.userModel.find().exec();
   }

   async findUserById(id: string) {
      return (await (await this.userModel.findById(id).exec()).populate("tickets")).populate("notifications");
   }

   async updateUser(id: string, userupdt: UpdateUserDto) {
      const upUser = (await (await this.userModel.findByIdAndUpdate(id, userupdt)).populate("tickets")).populate("notifications")
      return upUser;
   }

   async deleteUser(id: string) {
      return await this.userModel.findByIdAndDelete(id);
   }

   async getNumberOfUser() {
      return await this.userModel.count();
   }

}
