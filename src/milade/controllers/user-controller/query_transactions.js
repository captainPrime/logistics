const Transactions = require('../../models/transactionmodel');
const {Logger} = require('../../utils/index');

module.exports = async(req,res) =>{
    try{
        const {user, type} = req.query;

        if(type && user){
            let transactions = await Transactions.find({$and: [
                {user_cloud_uuid: user},
                {transaction_type: type}
            ]})

            return res.status(200).send({
                status: "OK",
                message: "User transaction fetched successfully",
                payload: transactions
            })
        }
        
        else if(user){
            let transactions = await Transactions.find({user_cloud_uuid: user})

            return res.status(200).send({
                status: "OK",
                message: 'User transaction fetched successfully',
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