import * as moment from "moment";

import { db } from "../config/schema";
const { Parks } = require("./Park");
const	{ RideWaitTimes } = require("./WaitTime");

export const Rides = db.Model.extend({
  tableName: "rides",
  hasTimestamps: true,
  park: () => this.belongsTo(Parks),
  rideWaitTime: () => this.belongsToMany(RideWaitTimes)
});
