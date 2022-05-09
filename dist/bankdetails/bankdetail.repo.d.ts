import { Repository } from 'typeorm';
import { Bankdetail, BankdetailDTO } from './bankdetail.model';
export declare class BankdetailRepo extends Repository<Bankdetail> {
    add_bank_details(dto: BankdetailDTO): Promise<Bankdetail>;
    find_bank_by_userid(user_id: string): Promise<Bankdetail[]>;
    bank_exist(user_id: string, account_number: string): Promise<Bankdetail[]>;
}
