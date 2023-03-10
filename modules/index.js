const AuthorModule = require("./author")
const BookModule = require("./book")

module.exports = (rep) => {
    return {
        author: new AuthorModule(rep),
        book: new BookModule(rep),
    }
}