/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Put, Query, Render } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './schemas/user.schema';
import { UpdateUserDto } from './dto/updateUserDto';

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

