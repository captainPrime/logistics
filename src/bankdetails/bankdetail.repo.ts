import { EntityRepository, Repository } from 'typeorm';
import { CURRENCY } from './bankdetail.constant';
import { Bankdetail, BankdetailDTO } from './bankdetail.model';

@EntityRepository(Bankdetail)
export class BankdetailRepo extends Repository<Bankdetail> {
  add_bank_details(dto: BankdetailDTO) {
    const bankdetail = new Bankdetail();
    bankdetail.user = dto.user;
    bankdetail.account_number = dto.account_number;
    bankdetail.account_number_display = dto.account_number_display;
    bankdetail.account_name = dto.account_name;
    bankdetail.bank_name = dto.bank_name;
    bankdetail.bank_code = dto.bank_code;
    bankdetail.raw = dto.raw;
    bankdetail.currency = dto.currency ?? CURRENCY.NAIRA;
    bankdetail.raw = dto.raw;
    bankdetail.bank_id = dto.bank_id;

    return this.save(bankdetail);
  }

  find_bank_by_userid(user_id: string) {
    return this.find({
      where: { user_id: user_id },
      relations: ['user'],
    });

  }

    bank_exist(user_id: string, account_number: string) {
      return this.find({
        where: { 
          user_id,
          account_number
        },
        relations: ['user'],
      });
  }
}
