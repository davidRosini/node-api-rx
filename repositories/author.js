const BaseRepository = require("./base")

class AuthorRepository extends BaseRepository{
    constructor(orm) {
        super("author", orm)
    }

    async findOneByName(name) {
        return await this.orm.author.findOne({
            where: {
                name,
            }
        })
    }
}

module.exports = AuthorRepository