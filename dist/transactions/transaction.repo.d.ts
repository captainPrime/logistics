import { Repository } from 'typeorm';
import { Transaction, TransactionDTO } from './transaction.model';
export declare class TransactionRepo extends Repository<Transaction> {
    create_transaction(dto: TransactionDTO): Promise<Transaction>;
    find_transaction_by_reference(reference: string): Promise<Transaction>;
}
