const User = require('../../models/userschema');
const {Logger} = require('../../utils/index');

module.exports =async(req,res) =>{
    try{
        const {phonenumber, cloud_uuid} = req.body
        let user = await User.findOne({cloud_uuid});
        let phone = await User.findOne({phonenumber});
        if(user){
            return res.status(409).send({status:"ERROR", message: "Cloud uuid already exists"})
        } 
        else if(phone){
            return res.status(409).send({status:"ERROR", message: "Phone number already exists"})
        }
        else{
            const createuser = await User.create({
                cloud_uuid: cloud_uuid.trim(),
                phonenumber: phonenumber.trim()
            })
            await createuser.save()
            return res.status(201).send({
                status: "OK",
                message: "User created successfully",
                payload:{_id:createuser.id, phonenumber, cloud_uuid}
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