import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Helper } from '@app/internal/utils';
import { Session, SessionStore } from '@app/sessions';
import { UserRepo } from '@app/users';
import { CreateSessionDTO } from './session.validator';
import { AuthGuard } from '@app/http/middlewares';
import { Request } from 'express';

@ApiTags('Sessions')
@Controller('sessions')
export class SessionController {
  constructor(
    private readonly userRepo: UserRepo,
    private readonly helper: Helper,
    private readonly sessions: SessionStore,
  ) {}

  @Post('/')
  async create_user_session(@Body() _body: CreateSessionDTO): Promise<Session> {
    if (!_body.email_address && !_body.phone_number)
      throw new BadRequestException(
        'An email address or phone number is required at least.',
      );
    if (_body.phone_number)
      _body.phone_number = this.helper.format_phone_number(_body.phone_number);

    const user = await this.userRepo.find_or_create_user(_body);
    const token = await this.sessions.create(user.id, user);
    return { token, user };
  }

  /**
   * Gets user in session
   * @param req
   * @returns user in session
   */
  @Get('/')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async get_user_in_session(@Req() req: Request) {
    return req.user;
  }
}
