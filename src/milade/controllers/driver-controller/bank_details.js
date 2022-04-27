const Driver = require('../../models/driverschema');
const {Logger} = require('../../utils/index');

module.exports = async(req,res) => {
    try{
        const{id} = req.params
        const driver = await Driver.findOne({_id: id})
        const{account_name, account_number, bank_name} = req.body

     
        if(!driver) return res.status(404).send({
            status: "ERROR",
            message: 'Driver not found'
        })
        else{
            await driver.updateOne({
                account_details: {
                    account_name: account_name|| driver.account_details.account_name ,
                    account_number: account_number || driver.account_details.account_number,
                    bank_name: bank_name || driver.account_details.bank_name
                }
            })
            return res.status(200).send({
                status: "OK",
                message: "Bank details updated successfully"
            })
        }
    }
    catch(error){
        return res.status(400).send({
            status: "ERROR",
            payload: error.message
        })
    }
}