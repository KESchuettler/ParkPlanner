// import * as Themeparks from "themeparks";
// import { db } from "../config/schema";
const db = require("../config/schema");
// import { Rides } from "./Ride";
// import { Weather } from "./Weather";
// import { RideWaitTimes } from "./WaitTime";

const Parks = db.Model.extend({
  tableName: "parks",
  hasTimestamps: true,
});

// export const getWaitTimes = async () => {
//   const parks: DbPark[] = await Parks.fetchAll().then(collection => collection.models).catch(err => console.log(err));
//   for ( let i = 0; i <= parks.length - 1; i++ ) {
//     const park = parks[i].attributes;
//     const weather: DbWeather = await Weather.where( {"location" : park.location } ).fetch().then(weather => weather.attributes);
//     const waitTimes = await new Themeparks.Parks[park.apiParkName]().GetWaitTimes();
//     waitTimes.forEach(async (rideObj) => {
//       const rideId: number = await Rides.where({ "apiId": rideObj.id })
//                                         .fetch()
//                                         .then(function rideIdReturn(model) {
//                                           return model.attributes.id;
//                                         })
//                                         .catch(err => console.log(err));
//       if (rideObj.status !== "Closed") {
//         return new RideWaitTimes({
//           rideId,
//           waitTime: rideObj.waitTime,
//           status: rideObj.status,
//           isActive: rideObj.active,
//           dateTime: new Date(),
//           temp: JSON.parse(weather.weatherObj).temperature,
//           precip: JSON.parse(weather.weatherObj).precipIntensity

//         }).save();
//       }
//     });
//   }
//   return;
// };

module.exports = Parks;