"use strict"
const expect = require("chai").expect;
const should = require("chai").should;
const request = require("superagent");

describe("express-metric-logger basic tests",function() {
  let port = 8000;
  let app = require("./demoserver/demoServer");
  let baseUrl = `http://localhost:${port}`;
  let endPoint = "/people"
  before(function(done){
    app.start(port,done);
  });

  after(function(done){
    app.close(done);
  });

  it("Should be able to get an empty array of metrics",function(done) {
    let metrics = app.getMetrics();
    expect(metrics).to.be.instanceof(Array);
    expect(metrics).to.have.lengthOf(0);
    done();
  });

  it("Should be able to send basic requests",function(done) {
    request.get(`${baseUrl}${endPoint}`).end(function(err,res) {
        //console.log(res.text);
    });

    request.post(`${baseUrl}${endPoint}`).send({
      name: "Marco",
      last_name: "Villarreal",
      hobbies: ["nodejs","java","scala","polymer"]
    }).end(function(err,res) {
      //console.log(res.text);
    });

    request.post(`${baseUrl}${endPoint}`).send({
      name: "Marco",
      last_name: "Villarreal",
      hobbies: ["nodejs","java","scala","polymer"]
    }).end(function(err,res) {
      //console.log(res.text);
    });

    request.post(`${baseUrl}${endPoint}`).send({}).end(function(err,res) {
      //console.log(res.text);
    });

    request.get(`${baseUrl}${endPoint}/1`).end(function(err,res) {
      //console.log(res.text);
    });

    request.get(`${baseUrl}${endPoint}/2`).end(function(err,res) {
      //console.log(res.text);
    });

    request.get(`${baseUrl}${endPoint}/99`).end(function(err,res) {
      //console.log(res.text);
    });

    request.put(`${baseUrl}${endPoint}/1`).send({
      name: "Juan sin miedo"
    }).end(function(err,res) {
      //console.log(res.text);
    });

    request.delete(`${baseUrl}${endPoint}/4`).end(function(err,res) {
      //console.log(res.text);
    });

    request.delete(`${baseUrl}${endPoint}/2`).end(function(err,res) {
      //console.log(res.text);
    });

    request.get(`${baseUrl}${endPoint}`).end(function(err,res) {
      //console.log(res.text);

    });
      done();
  });

  it("Should be able to get an array full of metrics",function(done) {
    this.timeout(500);
    let metrics = app.getMetrics();
    expect(metrics).to.be.instanceof(Array);
    expect(metrics).to.have.lengthOf(11);

    expect(metrics[0]).to.have.property("endpoint");
    expect(metrics[0]).to.have.property("api_method");
    expect(metrics[0]).to.have.property("response_code");
    expect(metrics[0]).to.have.property("browser");
    expect(metrics[0]).to.have.property("version");
    expect(metrics[0]).to.have.property("operating_system");
    expect(metrics[0]).to.have.property("is_desktop");
    expect(metrics[0]).to.have.property("is_mobile");
    expect(metrics[0]).to.have.property("is_bot");
    expect(metrics[0]).to.have.property("processing_time");

    expect(metrics[6]).to.have.property("endpoint");
    expect(metrics[6]).to.have.property("api_method");
    expect(metrics[6]).to.have.property("response_code");
    expect(metrics[6]).to.have.property("browser");
    expect(metrics[6]).to.have.property("version");
    expect(metrics[6]).to.have.property("operating_system");
    expect(metrics[6]).to.have.property("is_desktop");
    expect(metrics[6]).to.have.property("is_mobile");
    expect(metrics[6]).to.have.property("is_bot");
    expect(metrics[6]).to.have.property("processing_time");

    expect(metrics[10]).to.have.property("endpoint");
    expect(metrics[10]).to.have.property("api_method");
    expect(metrics[10]).to.have.property("response_code");
    expect(metrics[10]).to.have.property("browser");
    expect(metrics[10]).to.have.property("version");
    expect(metrics[10]).to.have.property("operating_system");
    expect(metrics[10]).to.have.property("is_desktop");
    expect(metrics[10]).to.have.property("is_mobile");
    expect(metrics[10]).to.have.property("is_bot");
    expect(metrics[10]).to.have.property("processing_time");

    done();
  });
  it("Should be able to get the right number of metrics by http code",function(done){
    this.timeout(500);
    let metrics = app.getMetrics();
    let mapResponseCode = {};
    let mapMethod = {};
    let mappedResponses = metrics.reduce((a,b) => {
      mapResponseCode[b.response_code] = (mapResponseCode[b.response_code] || 0 ) + 1;
      return mapResponseCode;
    })

    metrics.reduce((a,b) => {
      mapMethod[b.api_method] = (mapMethod[b.api_method] || 0 ) + 1;
      return mapMethod;
    })
    expect(mapMethod).to.have.property("POST",3);
    expect(mapMethod).to.have.property("GET",4);
    expect(mapMethod).to.have.property("PUT",1);
    expect(mapMethod).to.have.property("DELETE",2);

    expect(mapResponseCode).to.have.property("200",5);
    expect(mapResponseCode).to.have.property("500",1);
    expect(mapResponseCode).to.have.property("404",4);
    done();
  })
});
