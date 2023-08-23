import { Injectable, NotAcceptableException } from '@nestjs/common';
import { UserModule } from 'src/users/user.module';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/users/user.service';
import { CreateUserDto } from 'src/users/dto/createuser.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}
  async validateUser(CreateUserDto): Promise<any> {
    const email = CreateUserDto.email;
    const password = CreateUserDto.password;
    const user = await this.userService.getUser(email);
    const passvalid = await bcrypt.compare(password, user.password);
    if (!user) {
      throw new NotAcceptableException('could not find the user');
    }
    if (user && passvalid) {
      return {
        userId: user.id,
        email: user.email,
      };
    }
    return null;
  }
}
