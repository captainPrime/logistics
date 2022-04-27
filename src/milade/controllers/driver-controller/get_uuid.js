const Driver = require('../../models/driverschema');
const {Logger} = require('../../utils/index');

//retrieve Driver Profile with id
module.exports = async(req,res) =>{
    try{
        let driver = await Driver.findOne(req.query)
        if(!driver){
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
        return res.status(503).send({
            status: "EEROR",
            payload: error.message
        })
    }
}