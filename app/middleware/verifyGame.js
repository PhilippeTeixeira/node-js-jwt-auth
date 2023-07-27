const db = require("../models")
const Game = db.game

checkDuplicateGame = (req, res, next) => {
    Game.findOne({
        where: {
            title: req.body.title
        }
    }).then(game => {
        if(game) {
            res.status(400).send({
                message: "Un jeu portant le même nom existe déjà dans la base de données !"
            })
            return
        }

        next()
    })
}

const verifyGame = {
    checkDuplicateGame: checkDuplicateGame
}

module.exports = verifyGame