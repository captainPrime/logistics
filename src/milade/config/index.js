const dotenv = require('dotenv');
dotenv.config();

module.exports = {
	BASE_URL: process.env.BASE_URL,
	JWT_SECRET: process.env.JWT_SECRET,
	MONGODB_URI: process.env.MONGODB_URI
}