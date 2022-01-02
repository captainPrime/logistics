import {
  BadRequestException,
  Body,
  Controller,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../../middlewares/';
import { UnauthorizedRequest } from '../../../internal/errors';
import { Helper } from '../../../internal/utils';
import { KeyNotFound, SessionStore } from '../../../sessions/sessions.store';
import { User } from '../../..//users/user.model';
import {
  DuplicateUser,
  UserNotFound,
  UserRepo,
} from '../../../users/user.repo';
import { UpdateUserDTO, UserDTO } from './user.validator';

@ApiTags('Users')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('/users')
export class UserController {
  constructor(
    private readonly userRepo: UserRepo,
    private readonly helper: Helper,
    private readonly sessions: SessionStore,
  ) {}

  @Post('/')
  async create_user(@Body() payload: UserDTO): Promise<User> {
    try {
      payload.phone_number = this.helper.format_phone_number(
        payload.phone_number,
      );
      return await this.userRepo.create_user(payload);
    } catch (err) {
      if (err instanceof DuplicateUser) {
        throw new BadRequestException(err.message);
      }
      throw err;
    }
  }

  /**
   * updates a user in the system
   * @param user_id user's id
   * @param payload new user deytails
   */
  @Put('/:user_id')
  async update_user(
    @Param('id') user_id: string,
    @Body() payload: UpdateUserDTO,
  ) {
    try {
      const user = await this.userRepo.update_user(user_id, payload);
      // @Todo use events later
      await this.sessions.update(user.id, user);
      return user;
    } catch (err) {
      if (err instanceof UserNotFound)
        throw new BadRequestException(err.message);
      if (err instanceof KeyNotFound) throw new UnauthorizedRequest();

      throw err;
    }
  }
}
