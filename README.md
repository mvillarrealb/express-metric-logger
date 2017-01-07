# express-metric-logger

A simple logging middleware to capture http activity and response time of your request, this middleware uses response-time and user-agent to provide useful information about
the issued request.

## Motivation

The main motivation to do this is that sometimes we need to collect stats and insights about our apis activity, this insights can help ous out to determine:
* How many errors(500 codes) we get(lower is better)
* How many daily request we get (to determine our api usage)
* How many time our endpoints spent on processing(to determine bottlenecks)
* How many cache hits we get on our api(higher is better)
* Wich pair(endpoint + verb) is the most used(to determine were to tune if required)


# Instalation

```shell
  npm install --save express-metric-logger
```
## Configuration
express-metric-logger has simple configurations here are the available options:

* *persist*(function): A function used by the middleware to persist your logging activity, this function can be synchronous or asynchronous, the logger will not wait for you he will simply delegate the task to you and assume that everything is fancy and nice.

_____

# Usage

Here we can see two good examples on how to implement express-metric-logger with persistence on mongoose(people love mongoose) and memory(dummy array)

# Memory Persistence

In this example we will use a simple express server with memory persistence
```javascript
"use strict"
  const express = require("express");
  const app     = express();
  app.use(require("body-parser").json());
  const metricLogger = require("express-metric-logger");
  const router = require("../test/demoserver/people");//in the test directory you can find this dummy people router

  let metrics = [];
  //This is the important part
  metricLogger.init(app,{
    persist: (entry) => {
      metrics.push(entry);//In the persist function we process our metrics persistence in this case we push the entry into metrics array
    }
  });

  app.use("/people",router);
  //We create a dummy route where we send saved metrics
  app.get("/metrics",(req,res,next) => {
    res.send(metrics);
  });

  app.listen(9000,()=>{
    console.log("Server started at port 9000");
  });

```
# Mongoose Persistence
In this example we follow the same server creation example
```javascript
"use strict"
const express = require("express");
const app     = express();

app.use(require("body-parser").json());

const metricLogger = require("../");
const router = require("../test/demoserver/people");
const mongooseDb = require("./model");//This model  is available in the examples directory
const ApiLog = mongooseDb.ApiLog;//we pass the model itself into ApiLog variable

metricLogger.init(app,{
  persist: (entry) => {
    /**
     * In this case we create a new instance of ApiLog mongoose model
     * and then save it into mongodb instance
     */
    new ApiLog(entry).save((err)=>{
      if(err){
        console.log(err);
      }
    })
  }
});

app.use("/people",router);

app.get("/metrics",(req,res,next) => {
  /**
   * Our metrics Api also help us out finding the corresponding
   * results
   */
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

```
____

# Final notes
In the examples above you could see how to implement simple metrics collectors, however is on your hands how to present this metrics in analitycs endpoints


# Tests

```shell

npm test

```
