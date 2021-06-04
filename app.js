const express = require("express");
const app = express();
const port = 3000;

// Using .env file parser to parse variables into process.env
// Ignore it if you are not using .env file
const dotenv = require('dotenv');
dotenv.config();

// Using body-parser in order to use req.body.anything
// Ignore it if you don't wanna use body parser
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// database connection
const mongoose = require("mongoose");
mongoose
  .connect(process.env.MONGO_CONNECT_URL)
  .then((result) => {
    console.log("Database connected.");
  })
  .catch((error) => {
    console.log("Error while connecting database: ", error);
  });


// Facebook Signup Authentication Routes Configuration
const facebookAuthRoute = require('./api/routes/auth/facebook');
const passport = require('passport');

app.use(passport.initialize());
app.use(facebookAuthRoute);

// Home Route
app.get("/", (req, res) => res.send("Hello World!"));

// Error Handling: Invalid Requests will be handled by the following middleware (it must be in the last)
app.use((req, res, next) => {
  const error = new Error("Error 404, Not Found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.json({
    error: {
      status: false,
      errorCode: 'not-found',
      message: error.message,
    },
  });
});

app.listen(port, () => console.log(`This app listening on port ${port}`));
