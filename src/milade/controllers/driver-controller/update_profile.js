const Driver = require('../../models/driverschema');
const {Logger} = require('../../utils/index');

module.exports = async(req,res) => {
    try{
        const{id} = req.params
        const{firstname, lastname,gender, profile_image, phonenumber,
            email, account_name, account_number, bank_name, payment_recipient_id} = req.body

        const driver = await Driver.findOne({_id: id});

        const findEmail = await Driver.findOne({email: email});
        
        if(findEmail && email != driver.email){
            return res.status(409).send({status:"ERROR", message: "Email already exists"})
        } 

        if(!driver) return res.status(404).send({
            status: "ERROR",
            message: 'Driver not found'
        })
        else{
            await driver.updateOne({
                firstname: firstname || driver.firstname,
                lastname: lastname || driver.lastname,
                gender: gender || driver.gender,
                profile_image: profile_image || driver.profile_image,
                phonenumber: phonenumber || driver.phonenumber,
                email: email || driver.email,
                payment_recipient_id: payment_recipient_id || driver.payment_recipient_id,
                account_details: {
                    account_name: account_name|| driver.account_details.account_name ,
                    account_number: account_number || driver.account_details.account_number,
                    bank_name: bank_name || driver.account_details.bank_name
                }
            })
            return res.status(200).send({
                status: "OK",
                message: "Driver profile updated successfully"
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