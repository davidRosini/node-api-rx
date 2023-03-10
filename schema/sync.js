(async () => {
    try {
        const orm = require("./models")

        await orm.sequelize.sync({force: true})

        console.log("Database updated!")

        process.exit(0)
    } catch (err) {
        console.log("\n Error syncing database. \n")
        console.log(err)
        process.exit(1)
    }
})();