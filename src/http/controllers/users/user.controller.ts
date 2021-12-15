import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { DuplicateUser, UserRepo } from '../../../users/user.repo';
import { UserService } from './user.service';
import { UserDTO } from './user.validator';

@Controller('/users')
export class UserController {
  constructor(readonly userRepo: UserRepo, readonly userService: UserService) {}
  @Post('/')
  async create_user(@Body() payload: UserDTO) {
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
