const db = require("../models");
const config = require("../config/auth.config");
const SpinnerEnquiry = db.SpinnerEnquiry;
const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

// Spinner Insert 
exports.findnumber = (req, res) => {
    SpinnerEnquiry.findOne({ where: {number: req.body.number, createdAt: { [Op.lt]: new Date() }} }).
      then(function(SEdata){
        if (SEdata) {             //exists...
            let data = {
              status: 0,
              message: 'you already spin Today Please come after 24 hour',
            }
            res.send(data);
        } else {
            let data = {
              status: 1,
              message: 'you can spin now'
            }
            res.send(data);
        }
      });
};

exports.insertnumber = (req, res) => {
    SpinnerEnquiry.create({
      number: req.body.number,
      status: req.body.status,
      prize_win: req.body.prize_win
    })
    .then(result => {
      let data = {
              status: 1
            }
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.allenquiry = (req, res) => {
    SpinnerEnquiry.findAll({      
    }).then(result => {
        console.log(result);
        res.status(200).send(result);      
    })
};