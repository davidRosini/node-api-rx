const AuthorRepository = require("./author")
const BookRepository = require("./book")

module.exports = (orm) => {
    return {
        book: new BookRepository(orm),
        author: new AuthorRepository(orm)
    }
}