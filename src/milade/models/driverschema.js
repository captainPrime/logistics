const mongoose = require('mongoose');
const Schema = mongoose.Schema 

const DriverSchema = new Schema ({
    firstname:{type:String},
    lastname:{type:String},
    phonenumber: {type:String},
    email: {type:String},
    profile_image: {type:String},
    gender:{type:String, enum:["Male", "Female"]},
    payment_recipient_id: {type: String},
    cloud_uuid:{type:String},
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
    ratings:{type:Number, default:0},
    total_rated: {type: Number, default:0},
    wallet: {
        account_balance: {type:Number, default: 0},
        last_transaction_id: {type:mongoose.Schema.Types.ObjectId, ref:'Transaction'}
    },
    account_details:{
        account_name: {type: String},
        account_number:{type:String},
        bank_name:{type:String}
    },
    
    driver_lat: {type: Number, default: 0},
    driver_lng: {type:Number, default: 0},
    driver_status:{type:String},
    driver_address:{type:String},

    vehicle_type: {type: String},
    vehicle_brand: {type:String},
    vehicle_model: {type:String},
    vehicle_year: {type: String},
    vehicle_license_plate: {type:String},
    vehicle_license_image: {type:String},
    vehicle_color: {type:String},

    ride_requests: {type: Number,default:0},
    bike_requests: {type: Number, default:0},
    delivery_requests:{type:Number, default:0},
    
    is_verified:{type:Boolean, default:false},
    is_flagged: {type:Boolean, default:false}

},{
    timestamps: true
})
module.exports =mongoose.model('Driver', DriverSchema)