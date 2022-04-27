const Ride = require('../../models/RideSchema');
const{Logger} = require('../../utils/index');

module.exports= async(req,res)=> {
    try{
        const{id} = req.params
        const rideRequests = await Ride.find({_id: id})

        return res.status(200).send({
            status: "OK",
            message: "Ride request fetched successfully",
            payload: rideRequests
        })
    }
    catch(error){
        return res.status(500).send({
            status:'ERROR',
            payload: error.message
        })
    }
}