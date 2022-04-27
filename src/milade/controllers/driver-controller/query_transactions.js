const Transactions = require('../../models/transactionmodel');
const {Logger} = require('../../utils/index');

module.exports = async(req,res) =>{
    try{
        const {driver, type} = req.query;

        if(type && driver){
            let transactions =await Transactions.find({
                $and: [{transaction_type: type}, 
                {driver_cloud_uuid: driver}]})

            return res.status(200).send({
                status: "OK",
                message: "Driver transactions fetched successfully",
                payload: transactions
            })
        }
        else if(driver){
            let transactions =await Transactions.find({driver_cloud_uuid: driver})
            return res.status(200).send({
                status: "OK",
                message: "Driver transactions fetched successfully",
                payload: transactions
            })
        }
       
    }   
    catch(error){
        return res.status(500).send({
            status:"ERROR",
            payload: error.message
        })
    }
}