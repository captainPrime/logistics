const mongoose = require('mongoose');
const Schema = mongoose.Schema 

const User = new Schema ({
    firstname: {type: String},
    lastname: {type: String},
    username: {type: String},
    payment_recipient_id: {type: String},
    ride_requests: {type: Number,default:0},
    bike_requests: {type: Number, default:0},
    delivery_requests:{type:Number, default:0},
    email: {type:String},
    phonenumber: {type:String},
    gender: {type:String, enum:["Male", "Female"]},
    profile_image: {type: String},
    cloud_uuid:{type:String},
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
    account_details:{
        account_name: {type: String},
        account_number:{type:String},
        bank_name:{type:String}
    },
    wallet: {
        account_balance: {type:Number, default: 0},
        last_transaction_id: {type:mongoose.Schema.Types.ObjectId, ref:'Transaction'}
    }
}, {
    timestamps: true
})
module.exports =mongoose.model('User', User)