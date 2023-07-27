const db = require("../models");
const User = db.user;

exports.allAccess = (req, res) => {
    res.status(200).send("Contenu Public")
}

exports.userBoard = (req,res) => {
    res.status(200).send("Contenu Utilisateur")
}

exports.adminBoard = (req,res) => {
    res.status(200).send("Contenu Administrateur")
}

exports.producerBoard = (req,res) => {
    res.status(200).send("Contenu Producteur/Productrice")
}

exports.CMBoard = (req,res) => {
    res.status(200).send("Contenu Community Manager")
}