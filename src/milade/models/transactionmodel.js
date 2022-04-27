const mongoose = require('mongoose');
const Schema = mongoose.Schema 

const TransactionModel = new Schema ({
        fullname: {type:String, required:true},
        previous_balance:{type:Number}, 
        user_cloud_uuid:{type:String},
        driver_cloud_uuid:{type:String},
        amount: {type:Number, required:true},
        withdrawal_id: {type:String},
        payment_referenceId: {type: String},
        user_id:{type:mongoose.Schema.Types.ObjectId, ref: 'User'},
        driver:{type:mongoose.Schema.Types.ObjectId, ref:'Driver'},
        transaction_type: {type:String, enum:["fund", "paid", "withdrawal"]},
        paymentMadeType: {type: String, enum:["ride", "delivery", "bike"]},
        paid_out:{
            receiver_cloud_uuid: {type:String},
            phonenumber: {type:String},
            fullname: {type:String}
        },
        created_at:{type: Date, default:Date.now}  
})
module.exports =mongoose.model('Transaction', TransactionModel);