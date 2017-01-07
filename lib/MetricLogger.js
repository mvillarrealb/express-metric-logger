"use strict"

const url = require("url");

module.exports = (options) => {

  return (req,res,responseTime) => {
    let userAgent = req.useragent;
    let endPoint = url.parse(req.originalUrl).pathname;
    if( (/\/$/).test(endPoint) ){
      let lastIndexOf = endPoint.lastIndexOf("/");
      endPoint = endPoint.substr(0,lastIndexOf);
    }
      endPoint = endPoint.replace(/\(\S+\)/g,"");
    let logEntry = {
      endpoint: endPoint,
      api_method : req.method,
      response_code : res.statusCode,
      browser: userAgent.browser,
      version: userAgent.version,
      operating_system: userAgent.os,
      is_desktop: userAgent.isDesktop,
      is_mobile : userAgent.isMobile,
      is_bot : userAgent.isBot,
      processing_time : responseTime,
      capture_stamp: new Date()
    };

    if(req && req.accessToken) {
      logEntry["accessToken"] = req.accessToken;
    }

    if( options && options.persist ) {
      if( typeof options.persist == "function" ) {
        let entry = JSON.stringify(logEntry);
        options.persist(logEntry);
      } else  {
        console.error("persist callback is not a function, NOTE: persist must be a function");
      }
    } else {
      console.warn("Missing persist callback on module definition, without persist there will be no metric collection at all")
    }
  };
};
