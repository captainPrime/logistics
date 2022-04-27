import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from 'src/auth/user.entity';
import { CreateRideDto } from './dto/create-ride.dto';
import { FilterRideDto } from './dto/FilterRideDto';
import { RideRepository } from './ride.repository';
import * as moment from 'moment';
import { Ride } from './entities/ride.entity';
import { query } from 'express';

@Injectable()
export class RideService {
  constructor(private rideRepository: RideRepository) {}

  async create(createRideDto: CreateRideDto, user: User) {
    return await this.rideRepository.createRide(createRideDto, user);
  }

  async findAll(user: User, filterRideDto?: FilterRideDto) {
    const { amount, category, description, endDate, startDate } = filterRideDto;

    const queryBuilder = this.rideRepository
      .createQueryBuilder()
      .where({ userId: user.id });

    if (!!amount) {
      queryBuilder.andWhere(`amount = :amount`).setParameter('amount', amount);
    }

    if (!!category) {
      queryBuilder
        .andWhere(`category = :category`)
        .setParameter('category', category);
    }

    if (!!description) {
      queryBuilder
        .andWhere(`description = :description`)
        .setParameter('description', description);
    }

    if (!!startDate) {
      queryBuilder
        .andWhere('created_at >= :startDate')
        .setParameter(
          'startDate',
          moment(startDate).format('YYYY-MM-DD 00:00:00.000'),
        );
    }

    if (!!endDate) {
      queryBuilder
        .andWhere('created_at < :endDate')
        .setParameter(
          'endDate',
          moment(endDate).format('YYYY-MM-DD 23:59:59.000'),
        );
    }

    queryBuilder.orderBy('created_at', 'ASC');

    return await queryBuilder.getMany();
  }

  async findOne(id: number, user: User) {
    const ride = await this.rideRepository.findOne({
      where: { id: id, userId: user.id },
    });

    if (!ride) {
      throw new NotFoundException('Not found');
    }

    return ride;
  }

  async remove(id: number, user: User) {
    const ride = await this.findOne(id, user);

    return await this.rideRepository.delete({ id: ride.id });
  }

  async getAllCategories(user: User) {
    const queryBuilder = this.rideRepository
      .createQueryBuilder()
      .select('category')
      .where({ userId: user.id })
      .groupBy('category');

    const response = await queryBuilder.getRawMany();

    return response.map((item: Ride) => item.category);
  }
}
