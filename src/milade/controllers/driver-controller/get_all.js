const Driver = require('../../models/driverschema');
const {Logger} = require('../../utils/index');


//retrieve An Agents Profile with id
module.exports = async(req,res) =>{
    try{
        let driver = await Driver.find()
                        .populate('reviews')
                        .populate({path: 'reviews', populate:{path:'user', select:['username', 'profile_image']}})
        
        return res.status(200).send({
            status: "OK",
            message: "Drivers fetched Successfully",
            payload: driver
        })
    }
    catch(error){
        return res.status(503).send({
            status: "ERROR",
            payload: error.message
        })
    }
}