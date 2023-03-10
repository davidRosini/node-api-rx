const BaseModule = require("./base")

class AuthorModule extends BaseModule {
    constructor(rep){
        super(rep, "author")
    }

    async findOneByName(name) {
        return this.rep.author.findOneByName(name)
    }
}

module.exports = AuthorModule