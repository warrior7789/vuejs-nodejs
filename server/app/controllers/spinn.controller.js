const db = require("../models");
const config = require("../config/auth.config");
const SpinnerEnquiry = db.SpinnerEnquiry;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

// Spinner Insert 
exports.findnumber = (req, res) => {
    SpinnerEnquiry.findOne({ where: {number: req.body.number} }).
      then(function(SEdata){
        if (SEdata) {
             //exists...
            console.log(SEdata);
            res.status(500).send({ message: 'Number Already Exist'});
        } else {
          
          // Save spinner_parts    to Database
          SpinnerEnquiry.create({
            number: req.body.number,
            status: req.body.status,
            entryDate: req.body.entryDate 
          })
          .then(result => {
            res.send({ message: "Insert successfully!" });
          })
          .catch(err => {
            res.status(500).send({ message: err.message });
          });
        }
      });
};
