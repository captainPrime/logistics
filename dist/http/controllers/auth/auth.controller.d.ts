import { Helper } from '@app/internal/utils';
import { SendCodeDTO, VerifyPhoneDTO } from './auth.validator';
import { TwilioService } from '@app/internal/twilio';
import { UserRepo } from '@app/users';
import { SessionStore, Session } from '@app/sessions';
export declare class AuthController {
    private twilioService;
    private helpers;
    private userRepo;
    private sessions;
    constructor(twilioService: TwilioService, helpers: Helper, userRepo: UserRepo, sessions: SessionStore);
    send_verification_code(payload: SendCodeDTO): Promise<string>;
    verify_phone_number(payload: VerifyPhoneDTO): Promise<Session>;
}
