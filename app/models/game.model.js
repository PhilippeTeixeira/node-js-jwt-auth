module.exports = (sequelize, Sequelize) => {
    const Game = sequelize.define("game", {
        title: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.TEXT
        },
        studioName: {
            type: Sequelize.STRING
        },
        pictures: {
            type: Sequelize.STRING
        },
        plateforms: {
            type: Sequelize.STRING
        },
        priority: {
            type: Sequelize.INTEGER
        },
        score: {
            type: Sequelize.INTEGER
        },
        gameEngine: {
            type: Sequelize.STRING
        },
        releaseDate: {
            type: Sequelize.DATEONLY
        },
        budget: {
            type: Sequelize.INTEGER
        },
        status: {
            type: Sequelize.STRING
        },
        typeOfGame: {
            type: Sequelize.STRING
        },
        numberOfPlayers: {
            type: Sequelize.STRING
        }
    })
    return Game
}