const BaseModule = require("./base")
class LoanModule extends BaseModule {
    constructor(rep){
        super(rep, "loan")
    }
}

module.exports = LoanModule