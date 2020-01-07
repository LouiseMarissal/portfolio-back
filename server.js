// initial configs
require("dotenv").config();

//Dependencies
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const router = express.Router();
var nodemailer = require("nodemailer");
const creds = require("./config/config");

// view engine

// defining transport

var transport = {
  host: "smtp.gmail.com",
  auth: {
    user: creds.USER,
    pass: creds.PASS
  }
};

var transporter = nodemailer.createTransport(transport);

transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Server is ready to take messages");
  }
});

// server configuration
const app = express();

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

app.use("/send", mailer);

// Getting / Using routin
app.listen(process.env.PORT, () => {
  console.log(
    "server now listening on port http://localhost:" + process.env.PORT
  );
});
