const Driver = require('../../models/driverschema');
const {Logger} = require('../../utils/index');

//retrieve An Agents Profile with id
module.exports = async(req,res) =>{
    try{
        const {id} = req.params
        let driver = await Driver.findOne({_id: id})
                        .populate('reviews')
                        .populate({path: 'reviews', populate:{path:'user', select:['username', 'profile_image']}})
        if(!driver){
            return res.status(404).send({
                status: "ERROR",
                message: "Driver not found"
            })
        }
        else{
            return res.status(200).send({
                status: "OK",
                message: "Driver details fetched Successfully",
                payload: driver
            })
        }
    }
    catch(error){
        return res.status(503).send({
            status: "ERROR",
            payload: error.message
        })
    }
}