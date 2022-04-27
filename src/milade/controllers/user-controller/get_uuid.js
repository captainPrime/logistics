const User = require('../../models/userschema');

//retrieve An Agents Profile with id
module.exports = async(req,res) =>{
    try{
        let user = await User.findOne({cloud_uuid: req.query})
        if(!user){
            return res.status(404).send({
                status: "EEROR",
                message: "Cloud uuid not found"
            })
        }
        else{
            return res.status(200).send({
                status: "OK",
                message: "Cloud uuid exists",
            })
        }
    }
    catch(error){
        console.log(error)
        Logger('get_cloud_uuid', error);
        return res.status(503).send({
            status: "EEROR",
            payload: err.message
        })
    }
}