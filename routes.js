const home = require("./endpoints")
const bookList = require("./endpoints/book/list")
const bookCreate = require("./endpoints/book/create")

const init = (server, mod) => {
    server.use((req, res, next) => {
        res.success = (result) => {
            return res.json(200, {
            result,
            })
        }
        res.error = (error) => {
            return res.json(400, {
            error,
            })
        }

        req.param = req?.body ? req.body : req.query

        return next()
    })

    server.get("/home", home)

    server.get("/book", async (req, res) => { await bookList(req, res, mod)})
    server.post("/book", async (req, res) => { await bookCreate(req, res, mod)})
    //TO DO: Add routes for missing endpoints (book, author, loan)
}

module.exports.init = init