import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { User } from '@app/users';

@Injectable()
export class Helper {
  private static _phone_number_regex = /^(0|\+?2340?)[0-9][01]\d{8}$/;

  public static get phone_number_regex(): RegExp {
    return Helper._phone_number_regex;
  }

  /**
   * takes a number that has passed the regex test and formats it into the +234 format
   * @param num
   * @returns the formatted number in +234 format
   */
  public format_phone_number(num: string) {
    let index;

    if (num[0] == '0') index = 1;

    if (/234/.test(num)) index = 0;

    if (/\+234/.test(num)) index = 4;

    return '+234' + num.slice(index);
  }

  public get_user_session(res: Response) {
    return res.locals.session as User;
  }
}
