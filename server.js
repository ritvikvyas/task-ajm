const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const config = require("./config");
const route = require('./route');

// Express app with middleware body-parser
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(config.mongoURI, { useCreateIndex: true })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// CORS policy
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Api routes
app.use('/api', route);

// Server for web
app.use('/', express.static(__dirname + '/client/dist'));

// Start server
const port = process.env.PORT || 8080;
app.listen(port, () => console.log('Server running on port ' + port));