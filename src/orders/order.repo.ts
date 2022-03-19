import { EntityRepository, Repository } from 'typeorm';
import { Order } from './order.model';

@EntityRepository(Order)
export class OrderRepo extends Repository<Order> {}
