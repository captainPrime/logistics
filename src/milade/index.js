const express = require('express');
const http = require('http');
const createError = require('http-errors')
const logger = require('morgan');
const cors = require('cors');
const ConnectDB = require('./db/index')
const app = express();
const config = require('./config/index')

const corsOption = {
	origin: process.env.NODE_ENV === 'production' ? config.BASE_URL : 'http://localhost:5000',
	optionsSuccessStatus: 200,
	credentials: true
}

//Middleware 
app.use(cors(corsOption))
app.use(express.json());
app.use(express.urlencoded({extended:false}));


const PORT = process.env.PORT || 5000
//index route
app.use('/api/v1', require('./routes/index'));

//Catch 404 and forard to error handler 
app.use((req,res, next) => {
    next(createError(404))
})

// error handler
app.use((err, req, res, next) => {
	// set locals, only providing error in development
	res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    
	// render the error page
	res.status(err.status || 500);
	res.send({
		status: 'ERROR',
		message: err.message,
		payload: { ...err }
	});
});

//Connect to db
ConnectDB().then(() => logger('App', 'Database ready.', 'success'))

app.listen(PORT, ()=>console.log(`Milade server started on ${PORT}`))