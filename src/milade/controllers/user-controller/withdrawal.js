const User = require('../../models/userschema');
const Transaction = require('../../models/transactionmodel');
const {Logger} =require('../../utils/index');

module.exports = async(req,res) => {
    try{
        const{
            amount, 
            transaction_type, 
            cloud_uuid, 
            withdrawal_id, 
            payment_referenceId
        } = req.body
        const user = await User.findOne({cloud_uuid: cloud_uuid})
        if(!user){
            return res.status(404).send({
                status: "ERROR",
                message: "User not found"
            })
        }

        else if(amount > user.wallet.account_balance || amount < 0){
            return res.status(400).send({
                status: "ERROR",
                message: "Insufficient funds"
            })
        }
        else if(transaction_type === "withdrawal"){
            const transaction = await Transaction.create({
                previous_balance: user.wallet.account_balance,
                user_cloud_uuid: cloud_uuid,
                fullname: user.firstname + ' '+ user.lastname,
                amount,
                transaction_type,
                withdrawal_id,
                payment_referenceId
            })
            await user.updateOne({
                wallet: {
                    account_balance: user.wallet.account_balance - amount,
                    last_transaction_id: transaction.id
                }
            })
            return res.status(200).send({
                status: "OK", 
                message: "Transaction successfull",
                payload:transaction
            })
        }
        else{
            return res.status(400).send({
                status: "ERROR", 
                message: "Not a valid transaction type"
            })
        }
    }
    catch(error){
        return res.status(500).send({
            status: "ERROR",
            payload: error.message
        })
    }
};