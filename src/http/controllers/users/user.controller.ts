import {
  BadRequestException,
  Body,
  Controller,
  Param,
  Patch,
  Post,
  Get,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard} from '@app/http/middlewares/';
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
  HOPPER_RATING
} from '@app/hoppers';
import { UpdateUserDTO, UserDTO } from './user.validator';
import { Request } from 'express';
import { UpdateHopperDTO } from './hopper.validator';
//import { uploadToCloudinary } from "@app/internal/FileUpload";


@ApiTags('Users')
 @ApiBearerAuth('access-token')
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
  // //@UseGuards(AdminGuard)
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
    @Param('user_id') user_id: string,
    @Body() payload: UpdateUserDTO,
  ) {
    try {
      const user = await this.userRepo.update_user(user_id, payload);
      // @Todo use events later
      await this.sessions.update(user.email_address, user);
      return user;
    } catch (err) {
      if (err instanceof UserNotFound)
        throw new BadRequestException(err.message);
      if (err instanceof KeyNotFound) throw new UnauthorizedRequest();

      throw err;
    }
  }
 /**
   * find a user in the system
   * @param email_address user's email_address
  
   */
  @Get('/find_user/:email_address')
  async find_user(
    @Param('email_address') email_address: string,
    ) {
    try {
     
      const user_detail =
        await this.userRepo.get_user_by_user_id(email_address);
      if (!user_detail) return;

    
     
      return user_detail;
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
  @Post('/hoppers/apply')

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
  @Post('/hoppers/re-apply')
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
  @Patch('/hoppers/:hopper_id/status')
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

/**
   * Find available Hopper 
   * @param hopper_id
   * @param dto
   * @returns
   */
 @Patch('/hoppers/:hopper_id/find')
 //@UseGuards(AuthGuard)
 async find_hopper(
   @Param('hopper_id') hopper_id: string,
 ) {
   try {

    //find hopper within 50km radar



     const hopper = await this.hopperRepo.get_hopper(hopper_id);
     return await this.hopperRepo.find_one_avaliable_hopper(hopper, HOPPER_STATUS.APPLIED);
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



/**
   * Track an Hopper 
   * @param hopper_id
   * @param dto
   * @returns
   */
 @Patch('/hoppers/:hopper_id/track')
 //@UseGuards(AdminGuard)
 async track_hopper(
   @Param('hopper_id') hopper_id: string,
   @Body() dto: UpdateHopperDTO,
 ) {
   try {
     const hopper = await this.hopperRepo.get_hopper(hopper_id);
     return await this.hopperRepo.update_hopper_status(hopper, HOPPER_STATUS.BOOKED);
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



/**
   * Rate an Hopper after delivery
   * @param hopper_id
   * @param dto
   * @returns
   */
 @Post('/hoppers/:hopper_id/rate')
//@UseGuards(AdminGuard)
 async rate_hopper(
   @Param('hopper_id') hopper_id: string,
   @Body() dto: HOPPER_RATING,
 ) {
   try {
     const hopper = await this.hopperRepo.get_hopper(hopper_id);
     return await this.hopperRepo.update_hopper_status(hopper, HOPPER_STATUS.BOOKED);
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

 //profile update

//  public newCreatePost = async ( req: RequestType, res: Response ): Promise<unknown> => {
//   try{
//     const { id: userId } = req.decoded;
//     let user;
//     const { title,  description } = req.body;
//     const picture  = req.files.postPictureUrl
//     const postPictureUrl: any = await uploadToCloudinary(picture);
//     console.log("postPictureUrl>>>>>>>", postPictureUrl.secure_url)
//     user = await User.findOne({
//       where: {
//         id: userId,
//       },
//       // //BREAK
//       attributes: {
//         include: ["password", "isAdmin", "verifiedKyc"],
//       },
//     });
//     if(!description || !title) {
//       return res.status(400).json({ message: "Cannot create a post without a title or description..."})
//     }
//     const email = user.email;
//     const userFirstName = user.firstName;
//     const userLastName = user.lastName
//     const profilePictureURL = user.profilePictureURL;
//     const location = user.location;
//     const registrationToken = user.registrationToken;
//     const postId = uuidGenerator();
//     const postData = {
//       id: postId,
//       userId: userId,
//       email: email,
//       username: `${userFirstName}`,
//       title,
//       description: description,
//       profileUrl: profilePictureURL,
//       location: (location || "No Location"),
//       postPictureUrl: postPictureUrl.secure_url,
//       likes: 0,
//       shares: 0,
//       hasLiked: false,
//       fullname: `${userFirstName} ${userLastName}`
//     }
//     const createdPost = await DashboardService.createPostService(postData);
    
//     if (registrationToken !== null) {
//       const { convert } = require('html-to-text');
//       // There is also an alias to `convert` called `htmlToText`.
      
//       const plainText = convert(description, {
//         wordwrap: false,
//       });
//       const payload = {
//         notification: {
//           title: `New Post by ${userFirstName} ${userLastName}`,
//           body: `${plainText}`,
//           click_action: "FLUTTER_NOTIFICATION_CLICK",
//           view: "feeds",
//         },
//         data: {
//           service: `${plainText}`,
//           title: `New Post by ${userFirstName} ${userLastName}`,
//           body: `${plainText}`,
//           click_action: "FLUTTER_NOTIFICATION_CLICK",
//           view: "feeds",
//         },
//       };
  
//       const options = {
//         priority: "high",
//         timeToLive: 60 * 60 * 24,
//       };

//       const registrationTokens = await User.findAll({
//         attributes: ["registrationToken"],
//         where: {
//           registrationToken: {
//             [Op.ne]: null,
//           },
//         },
//       });

//       registrationTokens.forEach((registrationToken) => {
//         console.log(registrationToken.registrationToken);
  
//         if (registrationToken.registrationToken !== null) {
//           firebase
//             .messaging()
//             .sendToDevice(registrationToken.registrationToken, payload, options)
//             .then(function (response) {
//               console.log("Successfully sent message:", response);
//               console.log(response.results[0].error);
//             })
//             .catch(function (error) {
//               console.log("Error sending message:", error);
//             });
//         }
//       });

//     }

//     return res.status(200).json({
//       message: "Post created successfully",
//       createdPost
//     })

//   } catch (error) {
//     const [resJson, statusCode] = sequelizeErrorHandler(error);
//     return res.status(statusCode).json(resJson);
//   }
  
// };

 //profile picture




//Google Map API

//  var origin1 = new google.maps.LatLng(55.930385, -3.118425);
// var origin2 = 'Greenwich, England';
// var destinationA = 'Stockholm, Sweden';
// var destinationB = new google.maps.LatLng(50.087692, 14.421150);

// var service = new google.maps.DistanceMatrixService();
// service.getDistanceMatrix(
//   {
//     origins: [origin1, origin2],
//     destinations: [destinationA, destinationB],
//     travelMode: 'DRIVING',
//     transitOptions: TransitOptions,
//     drivingOptions: DrivingOptions,
//     unitSystem: UnitSystem,
//     avoidHighways: Boolean,
//     avoidTolls: Boolean,
//   }, callback);

// function callback(response, status) {
//   // See Parsing the Results for
//   // the basics of a callback function.
// }
 

}
