import db from '../models';
import RateHelper from '../helpers/articleRatevalidator';
import PassportHelper from '../helpers/passport';

const { Rating, User } = db;
/**
 * @exports RatingController
 * @class RatingController
 * @description Rate a specific article
 * */
class RatingController {
  /**
     * Check the environment
     * @function rateArticle
     * @param  {object} req - accept object with user info
     * @param  {object} res - accept object with user info
     * @return {json} Returns json object
     * @static
     */
  static async rateArticle(req, res) {
    const { rate } = req.body;
    const rateAuthor = await PassportHelper.findRecord(User, req.user.id);
    const userData = {
      username: rateAuthor.username,
      email: rateAuthor.email,
      bio: rateAuthor.bio,
      image: rateAuthor.image
    };
    const ratings = await Rating.findOne({
      where: { reviewerId: rateAuthor.id, articleSlug: req.params.slug }
    });
    if (ratings) {
      const [, updatedRating] = await Rating.update(
        { rate },
        { where: { id: ratings.id }, returning: true }
      );
      return res.status(200).send({
        status: res.statusCode,
        data: { rating: updatedRating, Author: userData }
      });
    }
    const rating = await Rating.create({
      rate,
      articleSlug: req.params.slug,
      reviewerId: rateAuthor.id
    });
    return res.status(201).send({
      status: res.statusCode,
      data: { rating, Author: userData }
    });
  }




  async handleNew(req,res,next) {
    const body = req.body;
    const status =this.isValidDriverObject(body);
    if(!status.success) {
        res.status(400).json({status});
        return ;
    }

    const answer =await this.saveNewDriverToDB(body);
    console.log(answer.success);
    if(!answer.success) {
        console.log("Here");
        res.status(400).json(answer);
        return ;
    }
    res.status(200).json(answer);

}
async saveNewDriverToDB(driverObj) {
    const driverDocument = new DriverModel({
        name:driverObj.name,
        phone_number:driverObj.phone_number
    });
    let result = {success:false,message:""};
    try {
        let savedBody = await driverDocument.save();
        result.success = true;
        result.message = savedBody;
    } catch(err) {
        result.success = false;
        result.message = "Error creating User";
    } finally {
        return result;
    }
}

isValidDriverObject(body) {
    const errors = [];
    if(!body) {
        errors.push("No body found");
        return {
            success:false,
            errors:errors
        };
    }
    if(!body.name) errors.push("Invalid name");
    console.log(body.phone_number);
    if(!body.phone_number || body.phone_number.length!=10) errors.push("Invalid Phone Number");
    return {
        success:errors.length===0,
        errors:errors
    };
}

async handleRate(req,res,next) {
    const body = req.body;
    const valid = this.containsNecessaryFields(body);
    if(!valid.success) {
        res.status(400).json(valid);
        return;
    }
    const result =await this.rateUser(body);
    res.status(result.success?200:500).json(result);
    return ;
}

containsNecessaryFields(body) {
    const errors = [];
    if(!body) {
        errors.push("No body found");
        return {
            success:false,
            errors:errors
        };
    }
    if(!body.driver_id) errors.push("No Driver ID Provided");
    if(!body.user_id) errors.push("No Rider ID provided");
    if(!body.rating || body.rating<0 || body.rating>5) errors.push("Invalid Rating Provided");
    return {
        success:errors.length===0,
        errors:errors
    };
}

async rateUser(body) {
    const result = {success:false,messsage:""};
    try {
        const user = await userModel.findOne({_id:body.user_id});
        user.ratings.push({
            user_id:body.driver_id,
            rating:body.rating
        });

        // Logic for new Rating
        const new_rating = ((user.current_rating * user.num_trips) + body.rating)/(user.num_trips+1);
        user.current_rating = new_rating;
        user.num_trips = user.num_trips + 1;
        const response = await user.save();
        result.success = true;
        result.messsage = response; 
    } catch(err) {
        result.success = false;
        result.messsage = "Could not rate user.";
    } finally {
        return result;
    }
}

async handleProfile(req,res,next) {
    const body = req.query;
    if(!body.driver_id) {
        res.status(400).json({success:false,messsage:"No ID provided"});
        return ;
    }
    const result = {success:false,message:""};
    try {
        const info = await driverModel.findById(body.driver_id);
        result.success = true;
        result.message = info;
    } catch(err) {
        result.success = false;
        result.message = "Cannot Find Profile";
    }
    res.status(result.success?200:400).json(result);
}



}

const userModel = require('./../models/user');
const driverModel = require('./../models/driver');

class User {
    async handleNew(req,res,next) {
        const body = req.body;
        const status =this.isValidUserObject(body);
        if(!status.success) {
            res.status(400).json({status});
            return ;
        }

        const answer =await this.saveNewUserToDB(body);
		if(!answer.success) {
            res.status(400).json(answer);
            return ;
		}
		res.status(200).json(answer);

    }
    async saveNewUserToDB(userObj) {
        const userDocument = new userModel({
			name:userObj.name,
			phone_number:userObj.phone_number
		});
        let result = {success:false,message:""};
        try {
            let savedBody = await userDocument.save();
            result.success = true;
            result.message = savedBody;
        } catch(err) {
            result.success = false;
            result.message = "Error creating User";
        } finally {
            return result;
        }
    }

    isValidUserObject(body) {
		const errors = [];
		if(!body) {
			errors.push("No body found");
			return {
				success:false,
				errors:errors
			};
		}
		if(!body.name) errors.push("Invalid name");
		console.log(parseInt(body.phone_number));
        if(!body.phone_number || body.phone_number.length!=10) errors.push("Invalid Phone Number");
        return {
            success:errors.length==0,
            errors:errors
        };
	}
	
	async handleRate(req,res,next) {
		const body = req.body;
		const valid = this.containsNecessaryFields(body);
		if(!valid.success) {
			res.status(400).json(valid);
			return;
		}
		const result =await this.rateUser(body);
		res.status(result.success?200:500).json(result);
		return ;
	}

	containsNecessaryFields(body) {
		const errors = [];
		if(!body) {
			errors.push("No body found");
			return {
				success:false,
				errors:errors
			};
		}
		if(!body.driver_id) errors.push("No Driver ID Provided");
		if(!body.user_id) errors.push("No Rider ID provided");
		if(!body.rating || body.rating<0 || body.rating>5) errors.push("Invalid Rating Provided");
		return {
            success:errors.length==0,
            errors:errors
        };
	}
    
    async rateUser(body) {
		const result = {success:false,messsage:""};
		try {
			const driver = await driverModel.findOne({_id:body.driver_id});
			driver.ratings.push({
				user_id:body.user_id,
				rating:body.rating
			});

			// Logic for new Rating
			const new_rating = ((driver.current_rating * driver.num_trips) + body.rating)/(driver.num_trips+1);
			driver.current_rating = new_rating;
            driver.num_trips = driver.num_trips + 1;
            
			const response = await driver.save();
			result.success = true;
			result.messsage = response; 
		} catch(err) {
			result.success = false;
			result.messsage = "Could not rate user.";
		} finally {
			return result;
		}
	}

	async handleProfile(req,res,next) {
		const body = req.query;
		if(!body.user_id) {
			res.status(400).json({success:false,messsage:"No ID provided"});
			return ;
		}
		const result = {success:false,message:""};
		try {
			const info = await userModel.findById(body.user_id);
			result.success = true;
			result.message = info;
		} catch(err) {
			result.success = false;
			result.message = "Cannot Find Profile";
		}
		res.status(result.status?200:400).json(result);
	}
    

  /**
     * Check the environment
     * @function getArticleRating
     * @param  {object} req - accept object with user info
     * @param  {object} res - accept object with user info
     * @return {json} Returns json object
     * @static
     */
  static async getArticleRating(req, res) {
    const allRates = await RateHelper.getRating(req);
    const statusCode = allRates.status ? allRates.status : 200;
    const rates = !allRates.status ? allRates : allRates.errors;
    const key = allRates.status ? 'errors' : 'ratings';
    return res.status(statusCode).send({ status: res.statusCode, [key]: rates });
  }
}
export default RatingController;