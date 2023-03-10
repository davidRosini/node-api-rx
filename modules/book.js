const BaseModule = require("./base")
class BookModule extends BaseModule {
    constructor(rep){
        super(rep, "book")
    }
}

module.exports = BookModule