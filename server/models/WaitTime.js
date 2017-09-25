import * as moment from "moment";
import { db } from "../config/schema";
import { Rides } from "./Ride";

export const RideWaitTimes = db.Model.extend({
  tableName: "ride_wait_times",
  hasTimestamps: false,
  rides: () => this.hasMany(Rides),
});
