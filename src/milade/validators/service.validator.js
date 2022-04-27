const { body, header, oneOf, query } = require('express-validator');

const RideValidator = [
    body('destination', 'destination required').exists().trim(),
    body('destinationLat', 'destination latitute required').exists(),
	body('destinationLng', 'destination longitude required').exists(),
	body('pickup', 'pickup location required').exists().trim(),
	body('pickupLat', 'pickup latitude required').exists(),
    body('pickupLng', 'pickup longitude required').exists(),
    body('driverID', 'driver id required').optional().trim(),
    body('driverCloudUUID', 'driver cloud uuid required').optional().trim(),
	body('totalRequestCost', 'request cost required').exists().trim(),
    body('totalRequestDistance', 'request distance required').exists().trim(),
    body('totalRequestDuration', 'request duration required').exists().trim(),
	body('requestPayType', 'request payment type required').exists().trim().isIn(['card', 'wallet']),
    body('requestPayStatus', 'request payment status required').exists().trim(),
    body('requestMadeStatus', 'request made statusrequired').exists().trim(),
    body('requestEconomyChoice', 'request economy choice required').exists().trim(),
    body('requestPaymentID', 'payment id required').exists().trim(),
    body('userCloudUUID', 'cloud uuid required').exists().trim(),
    body('userID', 'user id required').exists().trim(),
    body('requestCreatedAt', 'request time required').exists()
];
const BikeValidator = [
    body('destination', 'destination required').exists().trim(),
    body('destinationLat', 'destination latitute required').exists(),
	body('destinationLng', 'destination longitude required').exists(),
	body('pickup', 'pickup location required').exists().trim(),
	body('pickupLat', 'pickup latitude required').exists(),
    body('pickupLng', 'pickup longitude required').exists(),
    body('driverID', 'driver id required').optional().trim(),
    body('driverCloudUUID', 'driver cloud uuid required').optional().trim(),
	body('totalRequestCost', 'request cost required').exists().trim(),
    body('totalRequestDistance', 'request distance required').exists().trim(),
    body('totalRequestDuration', 'request duration required').exists().trim(),
    body('requestPayType', 'request payment type required').exists().trim().isIn(['card', 'wallet']),
    body('requestPaymentID', 'payment id required').exists().trim(),
    body('requestPayStatus', 'request payment status required').exists().trim(),
    body('requestMadeStatus', 'request made status required').exists().trim(),
    body('userCloudUUID', 'cloud uuid required').exists().trim(),
    body('userID', 'user id required').exists().trim(),
    body('requestCreatedAt', 'request time required').exists()
];

const DeliveryValidator = [
    body('destination', 'destination required').exists().trim(),
    body('destinationLat', 'destination latitute required').exists(),
	body('destinationLng', 'destination longitude required').exists(),
	body('pickup', 'pickup location required').exists().trim(),
	body('pickupLat', 'pickup latitude required').exists(),
    body('pickupLng', 'pickup longitude required').exists(),
    body('driverID', 'driver id required').optional().trim(),
    body('driverCloudUUID', 'driver cloud uuid required').optional().trim(),
	body('totalRequestCost', 'total request cost required').exists().trim(),
    body('totalRequestDistance', 'total request distance required').exists().trim(),
    body('totalRequestDuration', 'total request duration required').exists().trim(),
    body('requestPaymentID', 'payment id required').exists().trim(),
	body('requestPayType', 'request payment type required').exists().trim().isIn(['card', 'wallet']),
    body('requestPayStatus', 'request payment status required').exists().trim(),
    body('requestMadeStatus', 'request made status required').exists().trim(),
    body('deliveryReceiverPhonenumber', 'receiver phonenumber required').exists().trim(),
    body('deliveryReceiverFullname', 'receiver fullname required').exists().trim(),
    body('userCloudUUID', 'cloud uuid required').exists().trim(),
    body('userID', 'user id required').exists().trim(),
    body('deliveryRequestType', 'delivery request type required').exists(),
    body('requestCreatedAt', 'request time required').exists()
];
const Validator= Object.freeze({
    RideValidator,
    BikeValidator,
    DeliveryValidator
})
module.exports = Validator