// import * as Themeparks from "themeparks";
const Themeparks = require('themeparks');

// import { Parks } from "../models/Park";
// import { Weather } from "../models/Weather";
// import { Rides } from "../models/Ride";
// import { RideWaitTimes } from "../models/WaitTime";
// import { CurrentParks } from "../helpers/parks";
const Parks = require('../models/Park');
const Weather = require('../models/Weather');
const Rides = require('../models/Ride');
const RideWaitTimes = require('../models/WaitTime');
const CurrentParks = require('../helpers/parks');

/*======================================
    ======     POPULATION HELPERS    =====
    The functions below serve only to populate
    the "rides" and "parks" tables for future use.
    Do not call these functions once the tables
    have been created as they do not check if the
    model already exists and will duplicate entries,
    doubling the run time of functions that iterate through each park or ride.
    ====================================== */



module.exports = populateRidesTable = function() {
  console.log("go!");
  // ======================================
  // ======     ONLY RUN ONE TIME     =====
  // ======================================
  for ( const park in CurrentParks) {
    if (Themeparks.Parks.hasOwnProperty(park)) {
      const parkObj = new Themeparks.Parks[park]();
      const name = parkObj.Name;
      Parks.where("parkName", name).fetch()
      .then(parkEntry => {
        parkObj.GetWaitTimes()
        .then(apiRidesArr => {
          apiRidesArr.forEach(apiRideObj => {
            checkIfRideExists(apiRideObj)
              .then(exists => {
                if (!exists) {
                  createNewRide(apiRideObj, parkEntry);
                }
              });
            });
        });
      });
    }
  }
};

 const checkIfRideExists = apiRideObj => {
  // Returns a promise that eventually resolves to true or false
  return new Rides({"apiId": apiRideObj.id}).fetch()
    .then(exists => !!exists)
    .catch(err => console.error(err));
};

 const createNewRide  = (apiRideObj, parkEntry) => {
  const { location, id } = parkEntry.attributes;
  return new Rides({
    apiId : apiRideObj.id,
    rideName: apiRideObj.name,
    parkId : id,
    hasFastPass: apiRideObj.fastPass,
    location: location,
    status: apiRideObj.status,
    schedule: JSON.stringify(apiRideObj.schedule)
  }).save()
  .then( ride => {
    console.log(`Created entry from ${ride.attributes.rideName}`);
  })
  .catch( err => {
    console.error(err);
  });
};

 const populateParksTable  = () => {
  // ======================================
  // ======     ONLY RUN ONE TIME     =====
  // ======================================
  console.log("go!");
  const parkArr = [];
  Object.keys(CurrentParks).forEach(park => {
    if (Themeparks.Parks.hasOwnProperty(park)) {
      const currPark = new Themeparks.Parks[park]();
      parkArr.push({
        "apiParkName" : park,
        "parkName": currPark.Name,
        "location" : JSON.stringify({
          "latitude" : CurrentParks[park].latitude,
          "longitude" : CurrentParks[park].longitude
        }),
        "fastPass" : currPark.FastPass
      });

    }
  });
  parkArr.forEach(parkObj => {
    createNewPark(parkObj);
  });
};

 const createNewPark = parkObj => {
  checkIfParkExists(parkObj)
    .then(exists => {
      if (!exists) {
        return new Parks({
        parkName : parkObj.parkName,
        apiParkName : parkObj.apiParkName,
        location : parkObj.location,
        hasFastPass : parkObj.fastPass,
      }).save()
        .then( themepark => {
          console.log(themepark);
        })
        .catch( err => {
          console.error(err);
        });
      }
    });
};

 const checkIfParkExists = apiParkObj => {
  // Returns a promise that eventually resolves to true or false
  return new Parks({"apiId": apiParkObj.id}).fetch()
    .then(exists => !!exists)
    .catch(err => console.error(err));
};

// export const addRideDescriptions = () => {
//   console.log("ADDING RIDE DESCRIPTIONS");
//   Ride.fetchAll()
//     .then(rides => {
//       rides.forEach(ride => {
//         var options = {
//           url: `https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=explaintext&titles=${ride.attributes.rideName}&redirects=1`,
//           port: 3000,
//           json: true
//         };
//         request(options, (err, res, body) => {
//           if (body !== undefined && body.query !== undefined) {
//             for (let key in body.query.pages) {
//               let pageid = key;
//             }
//             let description = body.query.pages[pageid].extract;
//             if (description !== null && description !== undefined) {
//               description = description.replace(/<{1}[^<>]{1,}>{1}/g,"");
//               ride.attributes.description = description;
//               ride.save();
//             } else {
//               ride.attributes.description = "No Description!";
//               ride.save();
//             }
//           } else {
//             ride.attributes.description = "No Description!";
//             ride.save();
//           }
//         });
//       });
//     });
// }
