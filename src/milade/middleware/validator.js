const { validationResult } = require('express-validator');

module.exports = (validationChain) => {
	return async (req, res, next) => {
		try {
			await Promise.all(validationChain.map(validation => validation.run(req)));
	
			const errors = validationResult(req);
	
			if (errors.isEmpty()) return next();
			else {
				return res.status(400).send({
					status: "ERROR",
					message: 'Some fields missing/incorrect.',
					payload: errors.array(),
				});
			}
		} catch (error) {

            return res.status(500).send({
				status: 'ERROR',
				payload: error,
				message: 'An error occured.'
			});
		}
	}
}