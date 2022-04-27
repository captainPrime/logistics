const{
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
} = require('../controllers/driver-controller/index');

const Validator = require('../middleware/validator');

const {
    LoginValidator, 
    CreateDriverValidator, 
    UpdateBankDetailsValidator,
    WithdrawalValidator,
    VehicleValidator,
    RatingValidator,
    LocationValidator
} = require('../validators/driver.validator');
const express = require('express');
const router = express.Router();


router.get('/find', FindDriver);

router.get('/transaction-history', QueryTransactions);

router.get('/', GetAllDrivers);

router.get('/details/:id', GetADriver);

//Get uuid 
router.get('/verify', Queryuuid);

router.post('/', Validator(CreateDriverValidator), CreateDriver);

router.post('/login', Validator(LoginValidator), LoginDriver);

router.put('/update/profile/:id', UpdateProfile);

router.put('/update/vehicle/:id', Validator(VehicleValidator), UpdateVehicleDetails);

router.put('/update/location/:id', Validator(LocationValidator), UpdateLocation);

router.put('/rating/:id', Validator(RatingValidator), DriverRating);

router.put('/withdraw', Validator(WithdrawalValidator), DebitWallet);

//Update Bank details 
router.put('/bank-details/:id', Validator(UpdateBankDetailsValidator),  BankDetails)


module.exports = router 