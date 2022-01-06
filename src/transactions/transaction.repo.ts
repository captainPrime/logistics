import { EntityRepository, Repository } from 'typeorm';
import { CURRENCY, TRANSACTION_STATUS } from './transaction.constant';
import { Transaction, TransactionDTO } from './transaction.model';

@EntityRepository(Transaction)
export class TransactionRepo extends Repository<Transaction> {
  create_transaction(dto: TransactionDTO) {
    const transaction = new Transaction();
    transaction.user = dto.user;
    transaction.intent = dto.intent;
    transaction.transaction_type = dto.transaction_type;
    transaction.amount = dto.amount;
    transaction.status = TRANSACTION_STATUS.INITIATED;
    transaction.provider = dto.provider;
    transaction.transaction_reference = dto.transaction_reference;
    transaction.raw = dto.raw;
    transaction.currency = dto.currency ?? CURRENCY.NAIRA;
    return this.save(transaction);
  }

  find_transaction_by_reference(reference: string) {
    return this.findOne({ where: { transaction_reference: reference } });
  }
}
