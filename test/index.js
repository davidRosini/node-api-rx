const request = require("supertest")
const should = require("should")
const orm = require("../schema/models")
const config = require("./../config")
const server = require("./../index")

try {
    const host = `localhost:${config.test.port}`

    const bookRepository = require("./repositories/book")
    const bookListEndpoint = require("./endpoints/book.list")

    describe("Testing Books API", async () => {
        it("Api should return message and code 200 \n", async () => {
            const res = await request(host).get("/home")

            should(res.body.result.message).equal("Api Up!")
        })

        before(async() => {
            await orm.sequelize.sync({force: true})
        })

        const rep = require("../repositories")(orm)

        describe("\n Testing repositories \n", async () => {
            describe("Book", async () => {
                await bookRepository(rep, should)
            }) 
        })

        describe("\n Testing endpoints \n", async () => {
            describe("Book - List endpoint", async () => {
                await bookListEndpoint(request, should, host)
            }) 
        })
    })

    after(() => {
        server.close()
        process.exit(0)
    })

} catch (err){
    console.log("Error starting test server. \n")
    console.log(err)
    server.close()
    process.exit(1)
}




