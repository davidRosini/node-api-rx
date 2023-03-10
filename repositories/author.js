const BaseRepository = require("./base")

class AuthorRepository extends BaseRepository{
    constructor(orm) {
        super("author", orm)
    }
}

module.exports = AuthorRepository