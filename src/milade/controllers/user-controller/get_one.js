const User = require('../../models/userschema');
const {Logger} = require('../../utils/index');

//retrieve An Agents Profile with id
module.exports = async(req,res) =>{
    try{
        const {id} = req.params
        let user = await User.findOne({_id: id})
                    .populate({path:'wallet', populate:{path:'last_transaction_id'}})
        if(!user){
            return res.status(404).send({
                status: "ERROR",
                message: "User not found"
            })
        }
        else{
            return res.status(200).send({
                status: "OK",
                message: "User details fetched Successfully",
                payload: user
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