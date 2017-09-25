// import { Request, Response } from "express";
const { Request, Response } = require('express');
// import { Parks } from "../models/Park";
const { Parks } = 
// import { Rides } from "../models/Ride";
// import { RideWaitTimes } from "../models/WaitTime";

export const getRides = (req, res) => {
  const parkId = req.params.id;
  return Rides
    .where("parkId", parkId)
    .fetchAll()
    .then(rides => res.status(200).send(rides));
};

export const getRideWaitTimes = (req, res) => {
  const rideId = req.params.id;
  return RideWaitTimes
    .where("rideId", rideId)
    .fetchAll()
    .then(waitTimes => res.status(200).send(waitTimes));
};