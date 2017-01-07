"use strict"
let server = null;

const express = require("express");
const app     = express();

app.use(require("body-parser").json());
const metricLogger = require("../../");
const router = require("./people");
let metrics = [];

metricLogger.init(app,{
  persist: (entry) => {
    metrics.push(entry);
  }
});

app.use("/people",router);

module.exports = {
  getMetrics: ()=>{
    return metrics;
  },
  start: (port,cb) => {
    server = app.listen(port,cb)
  },
  close: (cb) => {
    server.close(cb);
  }
}
