const Review = require('../../models/Reviews');
const User = require('../../models/userschema');
const Driver = require('../../models/driverschema');
const {Logger} =require('../../utils/index');

module.exports = async(req,res) => {

    try{
        const{id} = req.params
        const{rating, review, userId, requestType, requestId} = req.body 
        const user = await User.findOne({_id: userId})
        const driver = await Driver.findOne({_id: id})

        if(!user){
            return res.status(404).send({
                status: "ERROR",
                message:"User not found"
            })
        }

        else if(!driver){
            return res.status(404).send({
                status: "ERROR",
                message:"Driver not found"
            })
        }

        else if( rating > 5){
            return res.status(400).send({
                status: "ERROR",
                message:"Rating can't be greater than 5"
            })
        }
        else{
            const create_review = await Review.create({
                rating,
                requestType,
                requestId,
                review: review.trim(),
                user: user._id,
                driver: driver._id
            })
            await user.updateOne({$push: {reviews: create_review.id}})
            /*await driver.updateOne({$push: {reviews: create_review.id}})
            await driver.updateOne({$inc: {ratings: rating}})*/

            await Driver.updateMany({_id: driver.id}, {
                $push: {reviews: create_review.id},
                $inc: {ratings: rating, total_rated: 1}
            })
            return res.status(200).send({
                state: "OK",
                message: "Review posted succesfully"
            })
        }
    }
    catch(error){
		return res.status(503).send({
			state: 'ERROR',
			payload: error.message
		});
    }
}

