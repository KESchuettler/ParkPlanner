const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const app = express();
const dotenv = require('dotenv');
dotenv.config();


// API file for interacting with MySQL
// const api = require('./server/routes/api');
const db = require('./server/config/schema');


// Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

// Angular DIST output folder
app.use(express.static(path.join(__dirname, 'dist')));

// API location
// app.use('/api', api);


/**
 * Import controllers
 */
const parksController = require('./server/controllers/parks')
 
/**
 * Primary app Routes
 */
app.get("/parks", parksController.getParks);
// app.get("/parks/:id", ridesController.getRides);
// app.get("/rides/:id", ridesController.getRideWaitTimes)

// Send all other requests to the Angular app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

//Set Port
const port = process.env.PORT || '3000';
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => console.log(`Running on localhost:${port}`));

/**
 * Start workers
 */
// waitTimeJob.start();
// weatherJob.start();