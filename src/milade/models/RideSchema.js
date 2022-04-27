const mongoose = require('mongoose');
const Schema = mongoose.Schema

const RideSchema = new Schema({
    destination: {type: String, required:true, text:true},
    destinationLat: {type: Number, required:true},
    destinationLng: {type: Number, required:true},
    pickup: {type: String, required:true, text:true},
    pickupLat: {type: Number, required:true},
    pickupLng: {type: Number, required:true},
    driverID: {type: String},
    driverCloudUUID: {type: String},
    totalRequestCost: {type: Number},
    totalRequestDistance: {type: String, required:true},
    totalRequestDuration: {type:String},
    requestPayType: {type: String},
    requestPaymentID: {type:String},
    requestPayStatus: {type: String, enum:["completed", "declined", "cancelled"]},
    requestMadeStatus: {type:String, enum:["completed", "declined", "cancelled"] },
    requestEconomyChoice: {type:String},
    requestCreatedAt: {type: Number},
    userCloudUUID: {type: String, required:true},
    userID: {type:String, required:true},
    Date: {type: Date, default:Date.now}
})

module.exports =mongoose.model('Ride', RideSchema);