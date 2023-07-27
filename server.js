const express = require("express")
const cors = require("cors")
const multer = require("multer")

const app = express()

var corsOptions = {
    origin: "http://localhost:8081"
}

app.use(cors(corsOptions))

// Analyse des requetes de content-type - application/json
app.use(express.json())

// Analyse des requetes de content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))

// Route basique
app.get("/", (req, res) => {
    res.json({ message: "Bienvenue sur l'application Gamesoft" })
})

//Gestion des téléchargement d'images
const fileFilter = (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"]
    if (!allowedTypes.includes(file.mimetype)) {
        const error = new Error("Incorrect file")
        error.code = "INCORRECT_FILETYPE"
        return cb(error, false)
    }

    cb(null, true)
}

const upload = multer({
    dest: './uploads',
    fileFilter,
    limits: {
        fileSize: 5000000
    }
})

app.post('/upload', upload.single('file'), (req, res) => {
    res.json({ file : req.file })
})

app.use((err, req, res, next) => {
    if(err.code === "INCORRECT_FILETYPE") {
        res.status(422).json({ error: "Only images are allowed" })
        return
    }
    if(err.code === "LIMIT_FILE_SIZE") {
        res.status(422).json({ error: "Allow file size is 5000KB" })
        return
    }
})

//routes
require('./app/routes/auth.routes')(app)
require('./app/routes/user.routes')(app)
require('./app/routes/game.routes')(app)

// configuration du port, écoute des requetes
const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log(`Le serveur fonctionne sur le port ${PORT}.`)
})

const db = require("./app/models")
const Role = db.role

// pour la production : remplacer ci-dessous par db.sequelize.sync()
const User = db.user
const Game = db.game
const Op = db.Sequelize.Op
db.sequelize.sync({force: true}).then(() => {
    console.log('Efface et resynchronise la BDD')
    initial()
})

var bcrypt = require("bcryptjs")

function initial() {
    Role.create({
        id: 1,
        name: "user"
    })

    Role.create({
        id: 2,
        name: "admin"
    })

    Role.create({
        id: 3,
        name: "producer"
    })

    Role.create({
        id: 4,
        name: "community_manager"
    })
    User.create({
        username: 'admin',
        email: 'admin@gmail.com',
        password: bcrypt.hashSync('123456789', 8),
    }).then(user => {
        Role.findAll({
            where: {
                name: 'admin'
            }
        }).then(roles => {
            user.setRoles(2)
        })
    })
    Game.create({
        title: "Demonio",
        description: "The greatest game",
        studioName: "Gamesoft",
        pictures: "./front/src/assets/demonio_background.jpg",
        plateforms: "PC",
        priority: "5",
        score: "0",
        gameEngine: "Unreal Engine",
        releaseDate: "2024-12-31",
        budget: "20000",
        status: "En développement",
        typeOfGame: "RPG",
        numberOfPlayers: "2"
    })
}