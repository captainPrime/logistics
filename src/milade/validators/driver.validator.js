const { body} = require('express-validator');

const CreateDriverValidator = [
    body('cloud_uuid', 'cloud uuid required').exists().trim(),
    body('phonenumber', 'phone number required').exists().trim()
];

const LoginValidator = [
    body('cloud_uuid', 'cloud uuid required').exists().trim(),
    body('phonenumber', 'phone number required').exists().trim()
];

const WithdrawalValidator = [
    body('amount', 'amount required').exists(),
    body('transaction_type', 'transaction type required').exists().trim(),
    body('cloud_uuid', 'user cloud uuid required').exists().trim(),
    body('withdrawal_id', 'withdrawal identification required').exists(),
    body('payment_referenceId', 'payment reference required').exists()
];

const UpdateBankDetailsValidator = [
    body('account_name', 'account name required').exists(),
    body('account_number', 'account number required').exists().trim(),
    body('bank_name', 'bank name required').exists().trim()
];

const VehicleValidator =[
    body('vehicle_license_image', 'license image required').exists().trim(),
    body('vehicle_type', 'vehicle type required').exists().trim(),
    body('vehicle_brand', 'brand required').exists().trim(),
    body('vehicle_model', 'model required').exists().trim(),
    body('vehicle_year', 'vehicle year required').exists(),
    body('vehicle_license_plate', 'license plate required').exists().trim(),
    body('vehicle_color', 'color required').exists().trim()
]

const RatingValidator =[
    body('rating', 'rating required').exists(),
    body('requestType', 'request type required').exists().isIn(['ride', 'bike', 'delivery']).trim(),
    body('requestId', 'request id required').exists().trim(),
    body('review', 'review required').exists().trim(),
    body('userId', 'user cloud id required').exists().trim()
]

const LocationValidator = [
    body('driver_lat', 'latitude required').exists(),
    body('driver_lng', 'longitude required').exists()
]
const UpdateProfileValidator = [
    body('firstname').optional(),
    body('lastname',).optional(),
    body('gender', ).optional(),
    body('profile_image').optional(),
    body('phonenumber').optional(),
    body('username').optional(),
    body('email').optional()
]

const DriverValidator= Object.freeze({
    CreateDriverValidator,
    UpdateBankDetailsValidator,
    LoginValidator,
    WithdrawalValidator,
    VehicleValidator,
    RatingValidator,
    LocationValidator
})
module.exports = DriverValidator