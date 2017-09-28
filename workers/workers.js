// import * as cron from "cron";
// import { getWaitTimes } from "../server/models/Park";
// import { getWeather } from "../server/models/Weather";
const cron = require('cron');
const Parks = require('../server/models/Park');
const Weather = require('../server/models/Weather');

const CronJob = cron.CronJob;

exports.waitTimeJob = new CronJob({
  cronTime: "00 * * * * *",
  onTick: function() {
    // Runs every 15 minutes on the minute.
    Parks.getWaitTimes();
    console.log(`getWaitTime CronJob Tick @ ${new Date().toLocaleTimeString()}`);
  },
  start: false,
  timeZone: "America/Los_Angeles"
});


exports.weatherJob = new CronJob({
  cronTime: "0 0 */2 * * *",
  onTick: function() {
    // Runs every other hour on the hour
    Weather.getWeather();
    console.log(`getCurrentWeather CronJob Tick @ ${new Date().toLocaleTimeString()}`);
  },
  start: false,
  timeZone: "America/Los_Angeles"
});
