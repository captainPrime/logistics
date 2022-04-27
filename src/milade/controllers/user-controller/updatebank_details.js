const User = require('../../models/userschema');
const {Logger} = require('../../utils/index');

module.exports = async(req,res) => {
    try{
        const{id} = req.params
        const user = await User.findOne({_id: id})
        const{account_name, payment_recipient_id, account_number, bank_name} = req.body

        if(!user) return res.status(404).send({
            status: "ERROR",
            message: 'User not found'
        })
        
        else{
            await user.updateOne({
                account_details: {
                    account_name: account_name|| user.account_details.account_name ,
                    account_number: account_number || user.account_details.account_number,
                    bank_name: bank_name || user.account_details.bank_name
                },
                payment_recipient_id: payment_recipient_id || user.payment_recipient_id
            })
            return res.status(200).send({
                status: "OK",
                message: "Bank details updated successfully"
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