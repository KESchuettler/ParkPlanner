// import { Request, Response } from "express";
// import { Parks } from "../models/Park";
const Parks = require("../models/Park.js");

/**
 * GET /parks
 * Return list of parks
 */

const funcs = {};
funcs.getParks = (req, res) => {
  console.log("/park");
  Parks.fetchAll()
  .then(parks => {
    res.status(200).send(parks);
  });
};

module.exports = funcs;