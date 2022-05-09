import { Request } from 'express';
import { OrderRequest } from 'order-requests/order-request.model';
import { OrderRequestRepo } from 'order-requests/order-request.repo';
import { LocationDTO } from '@app/http/controllers/sessions/session.validator';
import { CreateOrderRequestDTO } from './order-requests.validator';
export declare class OrderRequestController {
    private readonly orderRequestRepo;
    constructor(orderRequestRepo: OrderRequestRepo);
    create_order_request({ user }: Request, dto: CreateOrderRequestDTO): Promise<OrderRequest>;
    get_order_requests(query: LocationDTO): Promise<OrderRequest[]>;
}
