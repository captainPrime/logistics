const CreateDriver = require('../driver-controller/create_driver');
const GetADriver= require('../driver-controller/get_one');
const GetAllDrivers= require('../driver-controller/get_all');
const UpdateProfile = require('../driver-controller/update_profile');
const UpdateVehicleDetails = require('../driver-controller/upload_vehicleinfo');
const LoginDriver = require('../driver-controller/login_driver');
const Queryuuid = require('./get_uuid');
const UpdateLocation = require('./update location');
const DriverRating = require('./driver_rating');
const DebitWallet = require('./withdrawal');
const FindDriver = require('./find');
const QueryTransactions = require('./query_transactions');
const BankDetails = require('./bank_details');

const DriverController = Object.freeze({
    CreateDriver,
    GetAllDrivers,
    GetADriver,
    UpdateProfile,
    UpdateVehicleDetails,
    LoginDriver,
    Queryuuid,
    UpdateLocation,
    DriverRating,
    DebitWallet,
    FindDriver,
    QueryTransactions,
    BankDetails
})

module.exports = DriverController