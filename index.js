const express = require('express');
const bodyParser = require('body-parser');
var db = require('./database');
const logger = require('morgan');
const cors = require('cors');
const PORT = process.env.PORT || 3010;


const app = express()


app.use(bodyParser.urlencoded({extended: true, limit: '20mb'}));
app.use(bodyParser.json({limit: '20mb'}));
app.use(cors());
app.use(logger('dev'));


db.connection().then(database => {


	module.exports = database
	// app.use('/api/admin/players', PlayerCtrl)
	app.use('', require('./router/user'))

	app.listen(PORT, () => {
		console.log(`server is running on port ${PORT}`)
	});

})



