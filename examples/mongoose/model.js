let mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

const ApiLog = mongoose.model('ApiLog', {
  endpoint: String,
  api_method: String,
  response_code: Number,
  browser: String,
  version: String,
  operating_system:String,
  is_desktop: Boolean,
  is_mobile: Boolean,
  is_bot: Boolean,
  processing_time: Number,
  capture_stamp: Date
});

module.exports = {
  db: mongoose,
  ApiLog: ApiLog
};
