import {
  BadRequestException,
  Body,
  Controller,
  Injectable,
  Post,
} from '@nestjs/common';
import { Helper } from '../../../internal/utils';
import { SendCodeDTO, VerifyPhoneDTO } from './auth.validator';
import { TwilioService } from '../../../internal/twilio';
import { UserRepo } from '../../../users/user.repo';
import { SessionStore } from '../../../sessions/sessions.store';
import { Session } from '../../../sessions/session.model';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
@Injectable()
export class AuthController {
  constructor(
    private twilioService: TwilioService,
    private helpers: Helper,
    private userRepo: UserRepo,
    private sessions: SessionStore,
  ) {}

  /**
   * Sends verification phone to a phone number prior to granting authorization
   * @param payload
   * @returns string
   */
  @Post('/phone')
  async send_verification_code(@Body() payload: SendCodeDTO) {
    const phone_number = this.helpers.format_phone_number(payload.phone_number);
    await this.twilioService.send_verification_token(phone_number);
    return `Verification code has been sent to ${phone_number}`;
  }

  /**
   * validates phone verification and creates session if successful. throws exception on validation failure
   * @param payload
   * @returns response of user details and token
   */
  @Post('/phone/verify')
  async verify_phone_number(@Body() payload: VerifyPhoneDTO): Promise<Session> {
    const phone_number = this.helpers.format_phone_number(payload.phone_number);
    const verified = await this.twilioService.verify_phone_number(
      phone_number,
      payload.code,
    );
    if (!verified) {
      throw new BadRequestException('The provided code is invalid');
    }

    const user = await this.userRepo.get_or_create_user_by_phone_number(
      phone_number,
    );
    const token = await this.sessions.create(user.id, user);

    return { token, user };
  }
}
