const CreateRideRequest = require('./create-one');
const GetRideRequest = require('./get-one');
const QueryRideRequest = require('./query');

const RideController = Object.freeze({
    CreateRideRequest,
    GetRideRequest,
    QueryRideRequest
})

module.exports = RideController