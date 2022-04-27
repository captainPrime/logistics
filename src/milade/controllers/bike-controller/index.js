const CreateBikeRequest = require('./create-one');
const GetBikeRequest= require('./get-one');
const QueryBikeRequest = require('./query');

const BikeController = Object.freeze({
    CreateBikeRequest,
    GetBikeRequest,
    QueryBikeRequest
})

module.exports = BikeController