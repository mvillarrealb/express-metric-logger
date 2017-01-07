"use strict"
const express = require("express");
const app     = express();

app.use(require("body-parser").json());

const metricLogger = require("../");
const router = require("../test/demoserver/people");
const mongooseDb = require("./model");
const ApiLog = mongooseDb.ApiLog;
let metrics = [];

metricLogger.init(app,{
  persist: (entry) => {
    new ApiLog(entry).save((err)=>{
      if(err){
        console.log(err);
      }
    })
  }
});

app.use("/people",router);

app.get("/metrics",(req,res,next) => {
  ApiLog.find(function (err, metrics) {
    if (err){
      res.status(500).send(err)
    } else {
      res.send(metrics)
    }
  });
});

app.listen(9000,function(){
  console.log("Server started at port 9000");
});
