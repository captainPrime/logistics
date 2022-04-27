const express = require('express');
const router= express.Router();

const UserRouter =require('./user');
const DriverRouter = require('./driver');
const RideRouter= require('./ride');
const DeliveryRouter = require('./delivery');
const BikeRouter = require('./bike');

//Routes
router.use('/user', UserRouter);

router.use('/driver', DriverRouter);

router.use('/ride', RideRouter);

router.use('/bike', BikeRouter);

router.use('/delivery', DeliveryRouter)
module.exports = router