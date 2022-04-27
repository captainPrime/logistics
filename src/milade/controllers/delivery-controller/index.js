const CreateDeliveryRequest = require('./create-one');
const GetDeliveryRequest = require('./get-one');
const QueryDeliveryRequest = require('./query');

const RideController = Object.freeze({
    CreateDeliveryRequest,
    GetDeliveryRequest,
    QueryDeliveryRequest
})

module.exports = RideController