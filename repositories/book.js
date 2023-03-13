const BaseRepository = require("./base")

class BookRepository extends BaseRepository{
    constructor(orm) {
        super("book", orm)
    }

    async findOneByName(name) {
        return await this.orm.book.findOne({
            where: {
                name,
            }
        })
    }
}

module.exports = BookRepository