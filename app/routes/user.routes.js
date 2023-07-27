const { authJwt } = require("../middleware")
const controller = require("../controllers/user.controller")

module.exports = function(app) {
    app.use(function(req, res, next){
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        )
        next()
    })

    app.get("/api/test/all", controller.allAccess)

    app.get(
        "/api/test/user",
        [authJwt.verifyToken, authJwt.isCommonUser],
        controller.userBoard
    )
    app.get(
        "/api/test/admin",
        [authJwt.verifyToken, authJwt.isAdmin],
        controller.adminBoard
    )
    app.get(
        "/api/test/producer",
        [authJwt.verifyToken, authJwt.isProducer],
        controller.producerBoard
    )
    app.get(
        "/api/test/cm",
        [authJwt.verifyToken, authJwt.isCommunityManager],
        controller.CMBoard
    )
}