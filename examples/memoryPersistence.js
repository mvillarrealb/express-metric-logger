"use strict"
const express = require("express");
const app     = express();
app.use(require("body-parser").json());
const metricLogger = require("../");
const router = require("../test/demoserver/people");
let metrics = [];

metricLogger.init(app,{
  persist: (entry) => {
    metrics.push(entry);
  }
});

app.use("/people",router);

app.get("/metrics",(req,res,next) => {
  res.send(metrics);
});

app.listen(9000,function(){
  console.log("Server started at port 9000");
});
