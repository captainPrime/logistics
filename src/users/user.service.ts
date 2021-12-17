import { Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
  hash_password(password: string) {
    return hash(password, 10);
  }
}
