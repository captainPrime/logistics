const Driver = require('../../models/driverschema');
const {Logger} = require('../../utils/index');

module.exports = async(req,res) =>{
    try{
        const {phonenumber, cloud_uuid} = req.body
        let driver = await Driver.findOne({cloud_uuid: cloud_uuid})
        let phone = await Driver.findOne({phonenumber: phonenumber});
        if(driver){
            return res.status(409).send({status:"ERROR", message: "Cloud uuid already exists"})
        } 
        else if(phone){
            return res.status(409).send({status:"ERROR", message: "Phone number already exists"})
        }
        else{
            const createdriver = await Driver.create({
                cloud_uuid: cloud_uuid.trim(),
                phonenumber: phonenumber.trim()
            })
            await createdriver.save()
            return res.status(201).send({
                status: "OK",
                message: "Driver created successfully",
                payload:{id:createdriver.id, phonenumber}
            })
        }
    }
    catch(error){
        return res.status(500).send({
			status: 'ERROR',
			payload: error.message
		});
    }
}