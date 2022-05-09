import { Response } from 'express';
import { User } from '@app/users';
export declare class Helper {
    private static _phone_number_regex;
    static get phone_number_regex(): RegExp;
    format_phone_number(num: string): string;
    get_user_session(res: Response): User;
}
