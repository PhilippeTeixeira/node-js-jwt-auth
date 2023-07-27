const { verifyGame } = require("../middleware")
const controller = require("../controllers/game.controller")

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"            
        )
        next()
    })

    app.post(
        "/api/game/addgame",
        verifyGame.checkDuplicateGame,
        controller.addGame
    )

    app.get(
        "/api/game/gameslist",
        controller.getGameSList
    )
}