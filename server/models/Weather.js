import * as request from "request";
import { db } from "../config/schema";
import { Parks } from "../models/Park";

export const Weather = db.Model.extend({
  tableName: "weather_entries",
  hasTimestamps: false
  // initialize: () => {},
});

export const getWeather = async () => {
  const parks: DbPark[] = await Parks.fetchAll();
  parks.forEach(async (park) => {
    const { location } = park.attributes;
    const latitude = JSON.parse(location).latitude;
    const longitude = JSON.parse(location).longitude;
    request(`https://api.darksky.net/forecast/${process.env.DARK_SKY_KEY}/${latitude},${longitude}`, (err, res, body) => {
      if (err) {
        console.log(err);
      } else {
        Weather
          .where("location", location)
          .fetch()
          .then(weather => {
            if (weather) {
              weather.attributes.weatherObj = JSON.stringify(JSON.parse(body).currently);
              weather.save();
            } else {
              console.log(`Weather does not exist @ ${location}. Creating new model.`);
              new Weather({
                location: location,
                weatherObj: JSON.stringify(JSON.parse(body).currently)
              }).save();
            }
          });
      }
    });
  });
};