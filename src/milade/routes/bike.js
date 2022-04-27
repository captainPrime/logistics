const express = require('express');
const router = express.Router();

const Validator= require('../middleware/validator');
const{
    CreateBikeRequest,
     QueryBikeRequest, 
     GetBikeRequest
    } = require('../controllers/bike-controller/index');
const {BikeValidator} = require('../validators/service.validator')

router.post('/', Validator(BikeValidator), CreateBikeRequest )

router.get('/', QueryBikeRequest);

router.get('/:id', GetBikeRequest)

module.exports = router