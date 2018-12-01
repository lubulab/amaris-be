// modules
const express = require('express')
const bodyParser = require('body-parser');
const https = require('https');

// imports
const fetchData = require('./models/fetchData.js');
const apiRoutes = require("./controllers/api-routes")
const port = process.env.PORT || 3333;

// Initialize express
let app = express();
let server = https.createServer(app);

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Load data from mocky.io to our database if is empty
Promise.all([fetchData.loadClients(), fetchData.loadPolicies()]).then((responses) => {
    console.log(`${responses[0]}\n${responses[1]}`);
}).catch((rejectionsReasons) => {
    console.log(`${rejectionsReasons[0]}\n${rejectionsReasons[1]}`);
});

// apply the routes to our application with the prefix /api
app.use('/', apiRoutes);

// Launch app to listen to specified port
app.listen(port, () => {
    console.log(`Started up at port ${port}`);
});

app.get('/', function(req, res){ res.send('restful-assessment'); });

module.exports = {app};