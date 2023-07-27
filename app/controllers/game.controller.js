const db = require("../models")
const Game = db.game

exports.addGame = (req, res) => {
    Game.create({
        title: req.body.title,
        description: req.body.description,
        studioName: req.body.studioName,
        pictures: req.body.pictures,
        plateforms: req.body.plateforms,
        priority: req.body.priority,
        score: 0,
        gameEngine: req.body.gameEngine,
        releaseDate: req.body.releaseDate,
        budget: req.body.budget,
        status: req.body.status,
        typeOfGame: req.body.typeOfGame,
        numberOfPlayers: req.body.numberOfPlayers
    }).then(() => {
        res.status(200).send(
            { message: "Le jeu à été ajouté avec succès dans la base de données !"}
        )
    }).catch(err => {
        res.status(500).send ({ message: err.message })
    })
}

exports.getGameSList = (req, res) => {
    var gamesList = []
    Game.findAll({
        
    }).then((games) => {
        for (let game of games) {
            gamesList.push(game)
        }
        res.status(200).send({
             games
        })
    }).catch(err => {
        res.status(500).send({ message: err.message})
    })
}