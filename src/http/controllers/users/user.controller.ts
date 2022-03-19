import {
  BadRequestException,
  Body,
  Controller,
  Param,
  Patch,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard, AdminGuard } from '@app/http/middlewares/';
import { UnauthorizedRequest } from '@app/internal/errors';
import { Helper } from '@app/internal/utils';
import { KeyNotFound, SessionStore } from '@app/sessions';
import { User } from '@app/users';
import { DuplicateUser, UserNotFound, UserRepo } from '@app/users';
import {
  HopperRepo,
  DuplicateHopper,
  HopperNotFound,
  InvalidHopperStatusMove,
  HOPPER_STATUS,
} from '@app/hoppers';
import { UpdateUserDTO, UserDTO } from './user.validator';
import { Request } from 'express';
import { UpdateHopperDTO } from './hopper.validator';

@ApiTags('Users')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('/users')
export class UserController {
  constructor(
    private readonly userRepo: UserRepo,
    private readonly helper: Helper,
    private readonly sessions: SessionStore,
    private readonly hopperRepo: HopperRepo,
  ) {}

  @Post('/')
  @UseGuards(AdminGuard)
  async create_user(@Body() payload: UserDTO): Promise<User> {
    try {
      payload.phone_number = this.helper.format_phone_number(
        payload.phone_number,
      );
      return await this.userRepo.create_user(payload);
    } catch (err) {
      if (err instanceof DuplicateUser) {
        throw new BadRequestException(err.message);
      }
      throw err;
    }
  }

  /**
   * updates a user in the system
   * @param user_id user's id
   * @param payload new user deytails
   */
  @Put('/:user_id')
  async update_user(
    @Param('id') user_id: string,
    @Body() payload: UpdateUserDTO,
  ) {
    try {
      const user = await this.userRepo.update_user(user_id, payload);
      // @Todo use events later
      await this.sessions.update(user.id, user);
      return user;
    } catch (err) {
      if (err instanceof UserNotFound)
        throw new BadRequestException(err.message);
      if (err instanceof KeyNotFound) throw new UnauthorizedRequest();

      throw err;
    }
  }

  /**
   * Creates a new hopper application
   * @param req
   * @returns
   */
  @Post('hoppers/apply')
  async create_hopper_application(@Req() req: Request) {
    try {
      return await this.hopperRepo.create_hopper(req.user);
    } catch (err) {
      if (err instanceof DuplicateHopper) {
        throw new BadRequestException(err.message);
      }
      throw err;
    }
  }

  /**
   * Reinitializes an already declind hopper application
   * @param req
   * @returns
   */
  @Post('hoppers/re-apply')
  async hopper_reapplication(@Req() req: Request) {
    try {
      const hopper = await this.hopperRepo.get_hopper_by_user(req.user);
      return await this.hopperRepo.update_hopper_status(
        hopper,
        HOPPER_STATUS.APPLIED,
      );
    } catch (err) {
      if (err instanceof HopperNotFound) {
        throw new BadRequestException(err.message);
      }
      if (err instanceof InvalidHopperStatusMove) {
        throw new BadRequestException(
          'sorry, you can only reply for a declined application',
        );
      }
      throw err;
    }
  }

  /**
   * Admin update hopper application
   * @param hopper_id
   * @param dto
   * @returns
   */
  @Patch('hoppers/:hopper_id/status')
  @UseGuards(AdminGuard)
  async update_application(
    @Param('hopper_id') hopper_id: string,
    @Body() dto: UpdateHopperDTO,
  ) {
    try {
      const hopper = await this.hopperRepo.get_hopper(hopper_id);
      return await this.hopperRepo.update_hopper_status(hopper, dto.status);
    } catch (err) {
      if (err instanceof HopperNotFound) {
        throw new BadRequestException(err.message);
      }
      if (err instanceof InvalidHopperStatusMove) {
        throw new BadRequestException(err.message);
      }
      throw err;
    }
  }
}
