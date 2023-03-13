const BaseModule = require("./base")
class BookModule extends BaseModule {
    constructor(rep){
        super(rep, "book")
    }

    async findOneByName(name) {
        return this.rep.book.findOneByName(name)
    }
}

module.exports = BookModule