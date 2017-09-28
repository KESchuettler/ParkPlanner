// import * as moment from "moment";
const moment = require('moment');
// import { db } from "../config/schema";
const db = require('../config/schema')
// import { Rides } from "./Ride";
const Rides = require("./Ride");

const RideWaitTimes = db.Model.extend({
  tableName: "ride_wait_times",
  hasTimestamps: false,
  rides: () => this.hasMany(Rides),
});

module.exports = RideWaitTimes;
