const express = require('express');
const router = express.Router();

const Validator= require('../middleware/validator');
const{
 
    CreateDeliveryRequest,
  GetDeliveryRequest,
  QueryDeliveryRequest
    } = require('../controllers/delivery-controller/index');

const {DeliveryValidator} = require('../validators/service.validator');

router.post('/', Validator(DeliveryValidator), CreateDeliveryRequest);

router.get('/', QueryDeliveryRequest);

router.get('/:id', GetDeliveryRequest);

module.exports = router