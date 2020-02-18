const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;
const Spinner_parts = db.spinner_parts;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  // Save User to Database
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  })
    .then(user => {
      if (req.body.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles
            }
          }
        }).then(roles => {
          user.setRoles(roles).then(() => {
            res.send({ message: "User was registered successfully!" });
          });
        });
      } else {
        // user role = 1
        user.setRoles([1]).then(() => {
          res.send({ message: "User was registered successfully!" });
        });
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.signin = (req, res) => {
  User.findOne({
    where: {
      username: req.body.username
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      var authorities = [];
      user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }
        res.status(200).send({
          id: user.id,
          username: user.username,
          email: user.email,
          roles: authorities,
          accessToken: token
        });
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};
// Spinner Insert 
exports.addParts = (req, res) => {
  Spinner_parts.findAll({ where: {position: req.body.position} }).
      then(function(Spinner_parts_error){
        if (Spinner_parts_error.length > 0) {
          //exists...
          res.status(500).send({ message: 'Position Already Exist'});
        } else {
          // Save spinner_parts    to Database
          Spinner_parts.create({
            fillStyle: req.body.fillstyle,
            text: req.body.text,
            fontsize: req.body.fontsize,
            textFillStyle: req.body.textFillStyle,
            position: req.body.position   
          })
          .then(spinner_parts => {
            res.send({ message: "Insert successfully!" });
          })
          .catch(err => {
            res.status(500).send({ message: err.message });
          });
        }
      });
};

// Spinner Update 
exports.updateparts = (req, res) => {
  // Update spinner_parts to Database
  Spinner_parts.update({
    fillStyle: req.body.fillStyle,
    text: req.body.text,
    fontsize: req.body.fontsize,
    textFillStyle: req.body.textFillStyle,
    position: req.body.position
  },{
    where: {
      id: req.body.id
    }
  })
  .then(spinner_parts => {
      res.send({ message: "Update successfully!" });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

