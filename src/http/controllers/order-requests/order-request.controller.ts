import { AuthGuard } from '@app/http/middlewares';
import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import {
  OrderRequest,
  ORDER_REQUEST_STATUS,
} from 'order-requests/order-request.model';
import { OrderRequestRepo } from 'order-requests/order-request.repo';
import { LocationDTO } from '@app/http/controllers/sessions/session.validator';
import { CreateOrderRequestDTO } from './order-requests.validator';
import { Point } from 'geojson';

@ApiTags('Order Requests')
@UseGuards(AuthGuard)
@Controller('order-requests')
export class OrderRequestController {
  constructor(private readonly orderRequestRepo: OrderRequestRepo) {}

  @Post('/')
  async create_order_request(
    @Req() { user }: Request,
    @Body() dto: CreateOrderRequestDTO,
  ) {
    const sender = {
      first_name: dto.sender_first_name,
      last_name: dto.sender_last_name,
      address: dto.sender_address,
    };
    const receiver = {
      first_name: dto.receiver_first_name,
      last_name: dto.receiver_last_name,
      address: dto.receiver_address,
    };

    const order_request = new OrderRequest();

    order_request.user = user;
    order_request.sender_details = JSON.stringify(sender);
    order_request.recipient_details = JSON.stringify(receiver);
    order_request.package_type = dto.package_type;
    order_request.package_fragility = dto.package_fragility;
    order_request.package_minimum_size = dto.package_minimum_size;
    order_request.package_maximum_size = dto.package_maximum_size;
    order_request.status = ORDER_REQUEST_STATUS.CREATED;
    order_request.pickup_point = {
      type: 'Point',
      coordinates: [dto.pickup_point_lng, dto.pickup_point_lat],
    };
    order_request.delivery_point = {
      type: 'Point',
      coordinates: [dto.delivery_point_lng, dto.delivery_point_lat],
    };
    order_request.order_type = dto.order_type;

    return await this.orderRequestRepo.save(order_request);
  }

  @Get('/')
  async get_order_requests(@Query() query: LocationDTO) {
    const origin: Point = {
      type: 'Point',
      coordinates: [query.lng, query.lat],
    };
    // gets requests within a 5KM radius
    const orderRequests = await this.orderRequestRepo
      .createQueryBuilder()
      .where('ST_DWithin(pickup_point, ST_GeomFromGeoJSON(:origin), 5)')
      .orderBy({
        'ST_Distance(pickup_point, ST_GeomFromGeoJSON(:origin))': {
          order: 'ASC',
          nulls: 'NULLS FIRST',
        },
      })
      .setParameters({ origin: JSON.stringify(origin) })
      .getMany();

    return orderRequests;
  }
}
