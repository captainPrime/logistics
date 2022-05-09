import { FindUser, User } from './user.model';
import { Repository } from 'typeorm';
import { UpdateUserDTO, UserDTO } from '@app/http/controllers/users/user.validator';
export declare class UserRepo extends Repository<User> {
    create_user(user_data: UserDTO): Promise<User>;
    get_or_create_user_by_phone_number(phone_number: string): Promise<User>;
    update_user(user_id: string, payload: UpdateUserDTO): Promise<User>;
    find_or_create_user(params: FindUser): Promise<User>;
    update_user_balance(user: User): Promise<any>;
}
export declare class DuplicateUser extends Error {
    constructor();
}
export declare class UserNotFound extends Error {
    constructor();
}
