const express = require('express');
const router = express.Router();

const Validator= require('../middleware/validator');
const{
    CreateRideRequest,
    QueryRideRequest,
    GetRideRequest
    } = require('../controllers/ride-controller/index');

const {RideValidator} = require('../validators/service.validator')

router.post('/', Validator(RideValidator), CreateRideRequest )

router.get('/', QueryRideRequest);

router.get('/:id', GetRideRequest)
module.exports = router