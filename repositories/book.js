const BaseRepository = require("./base")

class BookRepository extends BaseRepository{
    constructor(orm) {
        super("book", orm)
    }
}

module.exports = BookRepository