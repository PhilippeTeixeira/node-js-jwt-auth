const jwt = require("jsonwebtoken")
const config = require("../config/auth.config")
const db = require("../models")
const User = db.user

verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"]

    if (!token) {
        return res.status(403). send({
            message: "Token inexistant"
        })
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "Accès non autorisé"
            })
        }
        req.userId = decoded.id
        next()
    })
}

isCommonUser = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        user.getRoles().then(roles => {
            for (let i=0; i < roles.length; i++) {
                if (roles[i].name === "user"){
                    next()
                    return
                }
            }

            res.status(403).send({
                message: "Requiert les droits Utilisateur"
            })
            return
        })
    })
}

isAdmin = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        user.getRoles().then(roles => {
            for (let i=0; i < roles.length; i++) {
                if (roles[i].name === "admin"){
                    next()
                    return
                }
            }

            res.status(403).send({
                message: "Requiert les droits Administrateur"
            })
            return
        })
    })
}

isProducer = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        user.getRoles().then(roles => {
            for (let i=0; i < roles.length; i++) {
                if (roles[i].name === "producer"){
                    next()
                    return
                }
            }

            res.status(403).send({
                message: "Requiert les droits Producteur/Productrice"
            })
            return
        })
    })
}

isCommunityManager = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        user.getRoles().then(roles => {
            for (let i=0; i < roles.length; i++) {
                if (roles[i].name === "communitymanager"){
                    next()
                    return
                }
            }

            res.status(403).send({
                message: "Requiert les droits Community Manager"
            })
            return
        })
    })
}

const authJwt = {
    verifyToken: verifyToken,
    isCommonUser: isCommonUser,
    isAdmin: isAdmin,
    isProducer: isProducer,
    isCommunityManager: isCommunityManager
}

module.exports = authJwt