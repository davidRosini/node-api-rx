const BookRepository = require("./book")

module.exports = (orm) => {
    return {
        book: new BookRepository(orm)
    }
}