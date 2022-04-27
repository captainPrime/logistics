const User = require('../../models/userschema');
const Driver = require('../../models/driverschema');
const Transaction = require('../../models/transactionmodel');
const {Logger} =require('../../utils/index');

module.exports = async(req,res) => {
    try{
        const{
            amount, 
            transaction_type, 
            paymentMadeType,
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

        else if(amount > user.wallet.account_balance || amount == 0 || amount < 0){
            return res.status(400).send({
                status: "ERROR",
                message: "Insufficient funds"
            })
        }
        else if(transaction_type === "paid"){
            const transaction = await Transaction.create({
                fullname: user.firstname + ' '+ user.lastname,
                previous_balance: user.wallet.account_balance,
                user_cloud_uuid: cloud_uuid,
                driver_cloud_uuid: receiver_cloud_uuid,
                paymentMadeType,
                amount,
                transaction_type,
                paid_out:{
                    receiver_cloud_uuid,
                    phonenumber,
                    fullname: receiver.firstname + ' '+ receiver.lastname,
                },
                user_id:user._id
            })
            await user.updateOne({
                wallet: {
                    account_balance: user.wallet.account_balance - amount,
                    last_transaction_id: transaction.id
                }
               })
            await receiver.updateOne({
                wallet: {
                    account_balance: receiver.wallet.account_balance + Math.floor(0.85 * amount),
                    last_transaction_id: transaction.id
                }
            })
            return res.status(200).send({
                status: "OK", 
                message: "Transaction successfull",
                payload: {id:transaction.id}
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
        Logger('debit_wallet', error);
        return res.status(500).send({
            status: "ERROR",
            payload: error.message
        })
    }
}