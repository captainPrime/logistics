const Driver = require('../../models/driverschema');
const Transaction = require('../../models/transactionmodel');
const {Logger} =require('../../utils/index');

module.exports = async(req,res) => {
    try{
        const{
            amount,
             transaction_type, 
             withdrawal_id,
             payment_referenceId, 
             cloud_uuid
            } = req.body
        const driver = await Driver.findOne({cloud_uuid: cloud_uuid})
        if(!driver){
            return res.status(404).send({
                status: "ERROR",
                message: "Driver not found"
            })
        }

        else if(amount > driver.wallet.account_balance || amount < 0){
            return res.status(400).send({
                status: "ERROR",
                message: "Insufficient funds"
            })
        }
        else if(transaction_type === "withdrawal"){
            const transaction = await Transaction.create({
                previous_balance: driver.wallet.account_balance,
                driver_cloud_uuid: cloud_uuid,
                fullname: driver.firstname + ' '+ driver.lastname,
                amount,
                withdrawal_id,
                payment_referenceId,
                transaction_type,
                driver:driver._id
            })
            await driver.updateOne({
                wallet: {
                    account_balance: driver.wallet.account_balance - amount,
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
}