const mongoose = require('mongoose');
const logger = require('../utils/Logger');
const config = require('../config/index');

const ConnectDB = async () => {
	try {
		// connect mongo
		mongoose.Promise = global.Promise;
		await mongoose.connect(
			process.env.NODE_ENV === 'production'
				? config.MONGODB_URI
				: 'mongodb+srv://milade:milade@milade.rn8zq.mongodb.net/milade?retryWrites=true&w=majority',
			{
				useNewUrlParser: true,
				autoIndex: process.env.NODE_ENV === 'production' ? false : true,
				useCreateIndex: true,
				useUnifiedTopology: true
			}
        );
        
		logger('Database connection', 'successful', 'info');
	} catch (error) {
		logger('Database connection', error);
	}
}

module.exports = ConnectDB