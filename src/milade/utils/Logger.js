const chalk = require('chalk');

module.exports = (location, message, type='error') => {
	console.log(` ${type === 'error' ? chalk.bgRed(' ERROR ') : chalk.bgMagenta(' INFO ')} -- ${chalk.yellow.bold(location)} -- `, message);
}