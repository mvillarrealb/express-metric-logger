"use strict"
const responseTime     = require("response-time");
const userAgent     	 = require("express-useragent");

const MetricLogger = {
  init: (app,options)=> {
    const loggerMiddleware = require("./lib/MetricLogger")(options);
    app.use(userAgent.express());
    app.use(responseTime(loggerMiddleware));
  }
};

module.exports = MetricLogger;
