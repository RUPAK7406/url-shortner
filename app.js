const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const logger = require('morgan')
const dotenv = require('dotenv');

//Impoting My Routes
const urlRoutes = require('./routes/url-routes');
var port = process.env.PORT || 8080;

dotenv.config();
app.use(bodyParser.urlencoded({
    extended: true
 }));
 app.use(bodyParser.json());
 app.use(logger('dev'));

//db Connection
//mongoose.connect('mongodb://localhost/product');
mongoose.connect(process.env.DB_URL, 
{ useNewUrlParser: true, useUnifiedTopology : true});

var db = mongoose.connection;

if(!db)
    console.log("Error connecting db")
else
    console.log("Db connected successfully")

app.get('/', (req, res) => res.send('Welcome to CRUD APP'));

//My Api Route Url
app.use('/api', urlRoutes);

app.listen(port, function () {
     console.log("Running Url Shortner on port " + port);
});