const CreateUser = require('./create_user');
const UpdateProfile = require('./update_profile');
const BankDetails = require('./updatebank_details');
const GetUser = require('./get_one');
const Calculateprice = require('./cost_api');
const Queryuuid = require('./get_uuid');
const LoginUser = require('./login_user')
const FundWallet = require('./fund_wallet');
const DebitWallet = require('./debit_wallet');
const withdrawal= require('./withdrawal');
const QueryTransactions = require('./query_transactions');
const DebitCard = require('./card_debit');

const UserController = Object.freeze({
    CreateUser,
    UpdateProfile, 
    BankDetails,
    GetUser,
    Calculateprice,
    Queryuuid,
    LoginUser,
    FundWallet,
    DebitWallet,
    withdrawal,
    QueryTransactions,
    DebitCard
})

module.exports = UserController

