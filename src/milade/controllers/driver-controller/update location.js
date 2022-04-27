const Driver = require('../../models/driverschema');

module.exports = async(req,res) => {
    try{
        const{driver_lat, driver_lng} = req.body 
        if(!driver_lat || !driver_lng){
            return res.status(400).send({status: "ERROR", message: "Please input all fields"})
        }
        let agent = await Driver.findById(req.params.id)
        await agent.updateOne({
            driver_lat,
            driver_lng
        }, {upsert: true})
        return res.status(201).send({
            status: "OK",
            message: "Location updated successfully",
            payload: {Longitude:driver_lng, Latitude:driver_lat}
        })
    }
    catch(error){
        return res.status(500).send({
            status: "ERROR",
            payload: error.message
        })
    }
}