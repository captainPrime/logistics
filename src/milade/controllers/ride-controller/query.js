const Ride = require('../../models/RideSchema');
const{Logger} = require('../../utils/index');

module.exports= async(req,res)=> {
    try{

        const {user, driver} = req.query 

        if(user){
            const rideRequests = await Ride.find({userCloudUUID: user})
            return res.status(200).send({
                status: "OK",
                message: "Ride requests fetched successfully",
                payload: rideRequests
            })
        }

        else if(driver){
            const rideRequests = await Ride.find({driverCloudUUID: driver})
            return res.status(200).send({
                status: "OK",
                message: "Ride requests fetched successfully",
                payload: rideRequests
            })
        }
    }
    catch(error){
        return res.status(500).send({
            status:'ERROR',
            payload: error.message
        })
    }
}