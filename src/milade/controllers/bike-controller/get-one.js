const Bike = require('../../models/BikeSchema');
const{Logger} = require('../../utils/index');

module.exports= async(req,res)=> {
    try{
        const{id} = req.params
        const bikeRequests = await Bike.find({_id: id})

        return res.status(200).send({
            status: "OK",
            message: "Bike request fetched successfully",
            payload: bikeRequests
        })
    }
    catch(error){
        res.status(500).send({
            status:'ERROR',
            payload: error.message
        })
    }
}