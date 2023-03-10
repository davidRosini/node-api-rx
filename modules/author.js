const BaseModule = require("./base")

class AuthorModule extends BaseModule {
    constructor(rep){
        super(rep, "author")
    }
}

module.exports = AuthorModule