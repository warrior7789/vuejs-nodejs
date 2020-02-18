
const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;
const Spinner_parts = db.spinner_parts;

exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
    res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
    res.status(200).send("Moderator Content.");
};

exports.allparts = (req, res) => {
    Spinner_parts.findAll({      
    }).then(result => {
        console.log(result);
        res.status(200).send(result);      
    })
};

exports.DeleteParts = (req, res) => {    
   
    return Spinner_parts.destroy({ 
        where: {
            id: req.params.id
        }
    }).then(result => {
        console.log(result);
        res.status(200).send("Delete Sucessfully...");      
    })
};

exports.SelectParticularParts = (req, res) => {
    Spinner_parts.findOne({
        where: {
            id: req.params.id
        }
    }).then(result => {
        console.log(result);
        res.status(200).send(result);      
    })
};