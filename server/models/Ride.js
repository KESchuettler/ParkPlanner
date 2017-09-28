//import * as moment from "moment";
const moment = require('moment');
// import { db } from "../config/schema";
const db = require('../config/schema');
const Parks = require("./Park");
const	RideWaitTimes = require("./WaitTime");

const Rides = db.Model.extend({
  tableName: "rides",
  hasTimestamps: true,
  park: () => this.belongsTo(Parks),
  rideWaitTime: () => this.belongsToMany(RideWaitTimes)
});

module.exports = Rides;