const Bike = require('../../models/BikeSchema');
const{Logger} = require('../../utils/index');

module.exports= async(req,res)=> {
    try{
        const {user, driver} = req.query;

        if(user){
            let bikeRequests = await Bike.find({userCloudUUID: user})

        return res.status(200).send({
            status: "OK",
            message: "Bike requests fetched successfully",
            payload: bikeRequests
        })
        }

        else if(driver){
            let bikeRequests = await Bike.find({driverCloudUUID: driver})

        return res.status(200).send({
            status: "OK",
            message: "Bike requests fetched successfully",
            payload: bikeRequests
        })
        }
    }
    catch(error){
        res.status(500).send({
            status:'ERROR',
            payload: error.message
        })
    }
}