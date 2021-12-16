import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { User } from 'src/users/user.model';
import { DuplicateUser, UserRepo } from '../../../users/user.repo';
import { UserService } from './user.service';
import { UserDTO } from './user.validator';

@Controller('/users')
export class UserController {
  constructor(readonly userRepo: UserRepo, readonly userService: UserService) {}

  @Post('/')
  @ApiBody({
    type: UserDTO,
  })
  async create_user(@Body() payload: UserDTO): Promise<User> {
    try {
      const password_hash = await this.userService.hash_password(
        payload.password,
      );
      return await this.userRepo.create_user(payload, password_hash);
    } catch (err) {
      if (err instanceof DuplicateUser) {
        throw new BadRequestException(err.message);
      }
      throw err;
    }
  }
}
