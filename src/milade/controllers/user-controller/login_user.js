const User = require('../../models/userschema');
const {Logger} = require('../../utils/index');

module.exports = async(req,res) =>{
    try{
        const {phonenumber, cloud_uuid} = req.body
        let user = await User.findOne({phonenumber: phonenumber})
        let cloud = await User.findOne({cloud_uuid: cloud_uuid})

        if(!user){
            return res.status(404).send({status: "ERROR", message: "Phonenumber not found"})
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
                payload:user
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