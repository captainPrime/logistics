import { ConfigService } from '@nestjs/config';
import { Env } from '@app/config/env.keys';
import { Injectable } from '@nestjs/common';
import { Twilio } from 'twilio';

/**
 * Twilio service class for all twilio communications.
 */
@Injectable()
export class TwilioService {
  /**
   * Twilio SDK instance
   */
  private twilio: Twilio;
  /**
   *Twilio  verification service SID
   */
  private verification_service_sid: string;

  constructor(configService: ConfigService) {
    const sid = configService.get(Env.twilio_account_sid);
    const auth_token = configService.get(Env.twilio_auth_token);
    this.twilio = new Twilio(sid, auth_token);
    this.verification_service_sid = configService.get(
      Env.twilio_verification_service_sid,
    );
  }

  /**
   * Initialize phone number verification. Phone numbers are in E.164 format (https://www.twilio.com/docs/glossary/what-e164)
   * @param to phone number to be verified
   * @returns Promise<null>
   */
  async send_verification_token(to: string) {
    await this.twilio.verify
      .services(this.verification_service_sid)
      .verifications.create({ to, channel: 'sms' });
    return null;
  }

  /**
   * verifies a phone number against its provided code
   * @param phone_number
   * @param code
   * @returns Promise<boolean>
   */
  async verify_phone_number(phone_number: string, code: string) {
    try {
      const res = await this.twilio.verify
        .services(this.verification_service_sid)
        .verificationChecks.create({ to: phone_number, code });
      return res.status.toLowerCase() == 'approved';
    } catch (err) {
      if (err.code == '20404') {
        return false;
      }
      throw err;
    }
  }
}
