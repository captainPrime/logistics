const Driver = require('../../models/driverschema');

module.exports = async(req,res) => {
    try{
        let agent = await Driver.find({$or: [{driver_lat: {$gte:req.query.lat}},{driver_lng: {$gte:req.query.lng}}]}, {
            cloud_uuid: 0,
            wallet: 0
        })

        return res.status(200).send({
            status: "OK",
            message: "Drivers fetched successfully",
            payload: agent
        })
    }
    catch(error){
        console.log(error)
        return res.status(500).send({
            status: "ERROR",
            payload: error.message
        })
    }
}