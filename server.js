// initial configs
require("dotenv").config();

//Dependencies
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
var nodemailer = require("nodemailer");

// view engine

// server configuration
const app = express();
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");

  // authorized headers for preflight requests
  // https://developer.mozilla.org/en-US/docs/Glossary/preflight_request
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();

  app.options("*", (req, res) => {
    // allowed XHR methods
    res.header("Access-Control-Allow-Methods", "POST, OPTIONS");

    res.send();
  });
});

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");
app.use(cookieParser());
app.use(bodyParser.json());

// app.use(cors([process.env.FRONTEND_URL]));
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    credentials: true,
    optionsSuccessStatus: 200
  })
);
// use the mailer route
const mailer = require("./routes/mailer");

app.use("/", mailer);
app.use("/send", mailer);

// Getting / Using routin
app.listen(process.env.PORT, () => {
  console.log(
    "server now listening on port http://localhost:" + process.env.PORT
  );
});
