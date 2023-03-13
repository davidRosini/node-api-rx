const request = require("supertest")
const should = require("should")
const orm = require("../schema/models")
const config = require("./../config")
const server = require("./../index")

try {
    const host = `localhost:${config.test.port}`

    const bookRepository = require("./repositories/book")
    const authorRepository = require("./repositories/author")
    const loanRepository = require("./repositories/loan")

    const authorModule = require("./modules/author")
    const bookModule = require("./modules/book")
    const loanModule = require("./modules/loan")

    const bookListEndpoint = require("./endpoints/book.list")
    const bookCreateEndpoint = require("./endpoints/book.create")
    const bookReadEndpoint = require("./endpoints/book.read")
    const bookUpdateEndpoint = require("./endpoints/book.update")
    const bookDeleteEndpoint = require("./endpoints/book.delete")

    const authorListEndpoint = require("./endpoints/author.list")
    const authorCreateEndpoint = require("./endpoints/author.create")
    const authorReadEndpoint = require("./endpoints/author.read")
    const authorUpdateEndpoint = require("./endpoints/author.update")
    const authorDeleteEndpoint = require("./endpoints/author.delete")

    const loanBorrowEndpoint = require("./endpoints/loan.borrow")
    const loanReturnEndpoint = require("./endpoints/loan.return")

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
            describe("\n Author \n", async () => {    
                await authorRepository(rep, should)
            })
            describe("\n Book \n", async () => {
                await bookRepository(rep, should)
            })
            describe("\n Loan \n", async () => {
                await loanRepository(rep, should)
            })
        })

        const mod = require("../modules")(rep)

        describe("\n Testing modules \n", async () => {
            describe("\n Author \n", async () => {    
                await authorModule(mod, should)
            })
            describe("\n Book \n", async () => {    
                await bookModule(mod, should)
            })
            describe("\n Loan \n", async () => {
                await loanModule(mod, should)
            })
        })

        describe("\n Testing endpoints \n", async () => {
            describe("Author - List endpoint", async () => {
                await authorListEndpoint(request, should, host)
            })
            describe("Author - Create endpoint", async() => {
                await authorCreateEndpoint(request, should, host)
            })
            describe("Author - Read endpoint", async() => {
                await authorReadEndpoint(request, should, host)
            })
            describe("Author - Update endpoint", async() => {
                await authorUpdateEndpoint(request, should, host)
            })
            describe("Author - delete endpoint", async() => {
                await authorDeleteEndpoint(request, should, host)
            })

            describe("Book - List endpoint", async () => {
                await bookListEndpoint(request, should, host)
            })
            describe("Book - Create endpoint", async() => {
                await bookCreateEndpoint(request, should, host)
            })
            describe("Book - Read endpoint", async() => {
                await bookReadEndpoint(request, should, host)
            })
            describe("Book - Update endpoint", async() => {
                await bookUpdateEndpoint(request, should, host)
            })
            describe("Book - Delete endpoint", async() => {
                await bookDeleteEndpoint(request, should, host)
            })

            describe("Loan - Borrow endpoint", async() => {
                await loanBorrowEndpoint(request, should, host)
            })
            describe("Loan - Return endpoint", async() => {
                await loanReturnEndpoint(request, should, host)
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
