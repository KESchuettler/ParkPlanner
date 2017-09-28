// import { Request, Response } from "express";
// import { Parks } from "../models/Park";
const Parks = require("../models/Park.js");

/**
 * GET /parks
 * Return list of parks
 */
exports.getParks = (req, res) => {
  Parks.fetchAll()
  .then(parks => {
    res.status(200).send(parks);
  });
};
