const Delivery = require('../../models/DeliverySchema');
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
            deliveryReceiverPhonenumber,
            deliveryReceiverFullname,
            userCloudUUID,
            requestPaymentID,
            userID,
            deliveryRequestType,
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
                const deliveryRequest = await Delivery.create({
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
                    requestPaymentID,
                    deliveryReceiverPhonenumber,
                    deliveryReceiverFullname,
                    userCloudUUID,
                    userID,
                    deliveryRequestType,
                    requestCreatedAt
                })
                await user.updateOne({$inc: {delivery_requests: 1}});
                await driver.updateOne({$inc: {delivery_requests: 1}});
                return res.status(201).send({
                    status: "OK",
                    message: "Delivery request completed succesfully",
                    payload: deliveryRequest
                })
            }
        }
        else{
            const deliveryRequest = await Delivery.create({
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
                deliveryReceiverPhonenumber,
                deliveryReceiverFullname,
                userCloudUUID,
                userID,
                deliveryRequestType,
                requestCreatedAt
            })
            return res.status(201).send({
                status: "OK",
                message: "Delivery request declined",
                payload: deliveryRequest
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