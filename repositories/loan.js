const BaseRepository = require("./base")

class loanRepository extends BaseRepository{
    constructor(orm) {
        super("loan", orm)
    }
}

module.exports = loanRepository