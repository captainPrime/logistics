import { ConfigService } from '@nestjs/config';
export declare class TwilioService {
    private twilio;
    private verification_service_sid;
    constructor(configService: ConfigService);
    send_verification_token(to: string): Promise<any>;
    verify_phone_number(phone_number: string, code: string): Promise<boolean>;
}
