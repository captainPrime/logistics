const express = require('express');
const router = express.Router()

const {
CreateUser,
 UpdateProfile, 
BankProfile,
GetUser,
Calculateprice, 
 Queryuuid, 
 LoginUser,
FundWallet,
 DebitWallet, 
 UpdateRequest,
 withdrawal,
 QueryTransactions,
 DebitCard,
 BankDetails
} = require('../controllers/user-controller/index');

const Validator = require('../middleware/validator');

//User Validator 
const{
    CreateUserValidator, 
    LoginValidator,
    DebitWalletValidator, 
    FundWalletValidator,
    WithdrawalValidator,
    UpdateProfileValidator,
    DebitCardValidator,
    UpdateBankDetailsValidator
} = require('../validators/user.validator');

//Routes 

//Get uuid
router.get('/verify', Queryuuid);
//Get User
router.get('/details/:id', GetUser);
//Get user transaction 
router.get('/transaction-history', QueryTransactions);


//Create User
router.post('/', Validator(CreateUserValidator), CreateUser);
//Login user
router.post('/login', Validator(LoginValidator), LoginUser);
//cost 
router.post('/cost', Calculateprice);

//Update Profile
router.put('/update/profile/:id', Validator(UpdateProfileValidator), UpdateProfile)
//Fund wallet
router.put('/fund-wallet', Validator(FundWalletValidator), FundWallet);
//Debit wallet
router.put('/debit-wallet', Validator(DebitWalletValidator), DebitWallet);

//Withdraw 
router.put('/withdraw', Validator(WithdrawalValidator), withdrawal);
//Debit user card 
router.put('/debit-card', Validator(DebitCardValidator), DebitCard); //Debit card
//Update Bank details 
router.put('/bank-details/:id', Validator(UpdateBankDetailsValidator), BankDetails)


module.exports = router