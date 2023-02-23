const request = require("supertest")
const should = require("should")
const orm = require("../schema/models")

const bookRepository = require("./repositories/book")

const bookListEndpoint = require("./endpoints/book.list")

describe("API UP", () => {
    it("Api should return message and code 200", (done) => {
        request("localhost:3000")
        .get("/home")
        .end((err, res) => {
            should(res.body.result.message).equal("Api Up!")
            done()
        })
    })
})

describe("Testing repositories", () => {
    before(async() => {
        await orm.sequelize.sync({force: true})
    })
    
    const rep = require("../repositories")(orm)

    describe("Book", async () => {
        await bookRepository(rep, should)
    }) 

    describe("Book - List", async () => {
        await bookListEndpoint(request, should)
    }) 
})

