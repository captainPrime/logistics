const User = require('../../models/userschema');
const Driver = require('../../models/driverschema');
const Transaction = require('../../models/transactionmodel');
const {Logger} =require('../../utils/index');

module.exports = async(req,res) => {
    try{
        const{
            amount, 
            paymentMadeType, 
            transaction_type,
             payment_referenceId, 
             cloud_uuid, 
             receiver_cloud_uuid,
             phonenumber
            } = req.body
        const user = await User.findOne({cloud_uuid: cloud_uuid})
        const receiver = await Driver.findOne({cloud_uuid: receiver_cloud_uuid})

        if(!user){
            return res.status(404).send({
                status: "ERROR",
                message: "User not found"
            })
        }
        else if(!receiver){
            return res.status(404).send({
                status: "ERROR",
                message: "Receiver not found"
            })
        }

        else if(transaction_type === "paid"){
            const transaction = await Transaction.create({
                fullname: user.firstname + ' '+ user.lastname,
                user_cloud_uuid: cloud_uuid,
                driver_cloud_uuid: receiver_cloud_uuid,
                paymentMadeType,
                amount,
                transaction_type,
                payment_referenceId,
                paid_out:{
                    receiver_cloud_uuid,
                    phonenumber,
                    fullname: receiver.firstname + ' '+ receiver.lastname,
                },
                user_id:user._id
            })
            await receiver.updateOne({
                wallet: {
                    account_balance: receiver.wallet.account_balance +  Math.floor(0.85 * amount),
                    last_transaction_id: transaction.id
                }
            })
            return res.status(200).send({
                status: "OK", 
                message: "Transaction successfull",
                payload: {id: transaction.id}
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
}