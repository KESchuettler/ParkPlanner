const express = require('express');
const bodyParser = require('body-parser');
const errorHandler = require('errorhandler');
const morgan = require('morgan');
const path = require('path');
const http = require('http');
const app = express();
const dotenv = require('dotenv');
const { waitTimeJob, weatherJob} = require('./workers/workers');

dotenv.config();


// API file for interacting with MySQL
// const api = require('./server/routes/api');
const db = require('./server/config/schema');


// Parsers
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

// Angular DIST output folder
app.use(express.static(path.join(__dirname, 'dist')));

/**
 * Error Handler. Provides full stack - remove for production
 */
app.use(errorHandler());

process.on("unhandledRejection", (r, p) => {
    console.log("Unhandled Rejection at Promise |", p, "reason:", r);
    // application specific logging, throwing an error, or other logic here
  });

/**
 * Import controllers
 */
const parksController = require('./server/controllers/parks');
const ridesController = require('./server/controllers/rides');
 
/**
 * Primary app Routes
 */
app.get("/parks", parksController.getParks);
app.get("/parks/:id", ridesController.getRides);
app.get("/rides/:id", ridesController.getRideWaitTimes);

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

// const Parks = require('./server/models/Park');
// Parks.getWaitTimes()

// const populateRidesTable = require('./server/config/populators');
// populateRidesTable()