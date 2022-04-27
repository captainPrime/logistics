const Delivery = require('../../models/DeliverySchema');
const{Logger} = require('../../utils/index');

module.exports= async(req,res)=> {
    try{

        const {user, driver} = req.query

        if(user){
            const deliveryRequests = await Delivery.find({userCloudUUID: user})

            return res.status(200).send({
                status: "OK",
                message: "Delivery requests fetched successfully",
                payload: deliveryRequests
            })
        }

        else if(driver){
            const deliveryRequests = await Delivery.find({driverCloudUUID: driver})
            return res.status(200).send({
                status: "OK",
                message: "Delivery requests fetched successfully",
                payload: deliveryRequests
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