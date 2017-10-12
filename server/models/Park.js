// import * as Themeparks from "themeparks";
// import { db } from "../config/schema";
// import { Rides } from "./Ride";
// import { Weather } from "./Weather";
// import { RideWaitTimes } from "./WaitTime";

const Themeparks = require('themeparks');
const db = require("../config/schema");
const Rides = require('./Ride');
const Weather = require('./Weather');
const RideWaitTimes = require('./WaitTime');

const Parks = db.Model.extend({
  tableName: "parks",
  hasTimestamps: true
})

Parks.getWaitTimes = async () => {
  const parks = await Parks.fetchAll().then(collection => collection.models).catch(err => console.log(err));
  console.log(`Getting wait times for ${parks.length} parks.`);
  for ( let i = 0; i <= parks.length - 1; i++ ) {
    const park = parks[i].attributes;
    const weather = await Weather.where( {"location" : park.location } ).fetch().then(weather => weather.attributes);
    const waitTimes = await new Themeparks.Parks[park.apiParkName]().GetWaitTimes();
    waitTimes.forEach(async (rideObj) => {
      const rideId = await Rides.where({ "apiId": rideObj.id })
                                  .fetch()
                                  .then(function rideIdReturn(model) {
                                    if(model) {
                                      return model.attributes.id;
                                    } else {
                                      console.log(`model: `, model);
                                      console.log('rideObj: ', rideObj);
                                    }
                                  })
                                  .catch(err => console.log(err));
      if (rideObj.status !== "Closed") {
        return new RideWaitTimes({
          rideId,
          waitTime: rideObj.waitTime,
          status: rideObj.status,
          isActive: rideObj.active,
          dateTime: new Date(),
          temp: JSON.parse(weather.weatherObj).temperature,
          precip: JSON.parse(weather.weatherObj).precipIntensity

        }).save();
      }
    });
  }
  return;
};

module.exports = Parks;