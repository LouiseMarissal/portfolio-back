const express = require("express");
const router = express.Router();
const creds = require("./../config/config");
const nodemailer = require("nodemailer");
const cors = require("cors");
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

router.get("/", (req, res) => {
  res.send("ok poto tu es dans le backend");
});

router.post("/send", (req, res) => {
  res.send("name " + req.body.name);
  var name = req.body.name;
  var email = req.body.email;
  var message = req.body.message;
  var content = `name: ${name} \n email: ${email} \n message: ${message} `;
  var mail = {
    from: name,
    to: "marissal.louise@gmail.com", //Change to email address that you want to receive messages on
    subject: "New Message from Contact Form",
    text: content
  };
  transporter.sendMail(mail, (err, data) => {
    // console.log(data);
    if (err) {
      res.json({
        msg: "fail"
      });
    } else {
      res.json({
        msg: "success"
      });
    }
  });
});

module.exports = router;
