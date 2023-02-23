const BookModule = require("./book")

module.exports = (repositories) => {
    return {
        book: new BookModule(repositories)
    }
}