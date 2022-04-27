const Driver = require('../../models/driverschema');
const {Logger} = require('../../utils/index');

module.exports = async(req,res) =>{
    try{
        const {phonenumber, cloud_uuid} = req.body
        let driver = await Driver.findOne({phonenumber: phonenumber})
        let cloud = await Driver.findOne({cloud_uuid: cloud_uuid})

        if(!driver){
            return res.status(404).send({status: "ERROR", message: "User not found"})
        } 
        else if(!cloud){
            return res.status(404).send({
                status: "ERROR",
                message: "Cloud uuid not found"
            })
        }
        else{
            return res.status(200).send({
                status: "OK",
                message: "Log in successful",
                payload:{
                    id: driver._id,
                    firstname: driver.firstname,
                    lastname: driver.lastname,  
                    cloud_uuid: driver.cloud_uuid,
                    is_verified: driver.is_verified,
                    phonenumber: driver.phonenumber           
                }
            })                      
        }
    }
    catch(error){
        res.status(500).send({
			status: 'ERROR',
			payload: error.message
		});
    }
}