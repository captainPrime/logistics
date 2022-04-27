const mongoose = require('mongoose');
const Schema = mongoose.Schema

const DeliverySchema = new Schema({
    destination: {type: String, required:true, text:true},
    destinationLat: {type: Number, required:true},
    destinationLng: {type: Number, required:true},
    pickup: {type: String, required:true, text:true},
    pickupLat: {type: Number, required:true},
    pickupLng: {type: Number, required:true},
    driverID: {type: String},
    driverCloudUUID:{type: String},
    totalRequestCost: {type: Number},
    totalRequestDistance: {type: String, required:true},
    totalRequestDuration: {type:String},
    requestPayType: {type: String},
    requestPayStatus: {type: String, enum:["completed", "declined", "cancelled"]},
    requestPaymentID: {type: String},
    requestMadeStatus: {type:String, enum:["completed", "declined", "cancelled"]},
    deliveryReceiverPhonenumber: {type:String, required:true},
    deliveryReceiverFullname: {type:String, required:true},
    requestCreatedAt: {type: Number},
    deliveryRequestType: [{
        _id: false,
        size: {type: String},
        weight: {type: String},
        amount: {type: String},
        package: {type: String}
    }],
    userCloudUUID: {type: String, required:true},
    userID: {type:String, required:true},
    Date: {type: Date, default:Date.now}
})

module.exports =mongoose.model('Delivery', DeliverySchema)