const express = require("express");
const router = express.Router();

router.post("/send", (req, res, next) => {
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
  transporter
    .sendMail(mail, (err, data) => {
      console.log(data);
      if (err) {
        res.json({
          msg: "fail"
        });
      } else {
        res.json({
          msg: "success"
        });
      }
    })
    .catch(error => {
      console.log(error);
    });
});

module.exports = router;
