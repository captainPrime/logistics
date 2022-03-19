import { EntityRepository, Repository } from 'typeorm';
import { OrderRequest } from './order-request.model';

@EntityRepository(OrderRequest)
export class OrderRequestRepo extends Repository<OrderRequest> {}
