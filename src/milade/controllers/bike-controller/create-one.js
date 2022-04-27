const Bike = require('../../models/BikeSchema');
const User = require('../../models/userschema');
const Driver = require('../../models/driverschema');
const{Logger} = require('../../utils/index');

module.exports= async(req,res)=> {
    try{
        const {
            destination,
            destinationLat,
            destinationLng,
            pickup,
            pickupLat,
            pickupLng,
            driverID,
            driverCloudUUID,
            totalRequestCost,
            totalRequestDistance,
            totalRequestDuration,
            requestPayType,
            requestPayStatus,
            requestMadeStatus,
            userCloudUUID,
            requestPaymentID,
            userID,
            requestCreatedAt
        } = req.body

        if(requestMadeStatus === "completed"){
            const user = await User.findOne({cloud_uuid: userCloudUUID})
            const driver = await Driver.findOne({cloud_uuid: driverCloudUUID})
            if(!user){
                return res.status(404).send({
                    status: "ERROR",
                    message: "User not found"
                })
            }
            else if(!driver){
                return res.status(404).send({
                    status: "ERROR",
                    message: "Driver not found"
                })  
            }
            else{
                const bikeRequest = await Bike.create({
                    destination,
                    destinationLat,
                    destinationLng,
                    pickup,
                    pickupLat,
                    pickupLng,
                    driverID,
                    driverCloudUUID,
                    totalRequestCost,
                    totalRequestDistance,
                    totalRequestDuration,
                    requestPayType,
                    requestPayStatus,
                    requestPaymentID,
                    requestMadeStatus,
                    userCloudUUID,
                    userID,
                    requestCreatedAt
                })
                await user.updateOne({$inc: {bike_requests: 1}});
                await driver.updateOne({$inc: {bike_requests: 1}});
                return res.status(201).send({
                    status: "OK",
                    message: "Bike request completed succesfully",
                    payload: bikeRequest
                })
            }
        }
        else{
            const bikeRequest = await Bike.create({
                destination,
                destinationLat,
                destinationLng,
                pickup,
                pickupLat,
                pickupLng,
                totalRequestCost,
                totalRequestDistance,
                totalRequestDuration,
                requestPayType,
                requestPayStatus,
                requestMadeStatus,
                userCloudUUID,
                userID,
                requestCreatedAt
            })
            return res.status(201).send({
                status: "OK",
                message: "Bike request declined",
                payload: bikeRequest
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