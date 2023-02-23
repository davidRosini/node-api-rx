class BookModule {
    constructor(repositories){
        this.rep = {
            ...repositories
        }
    }

    async list() {
        return this.rep.book.list()
    }

    async create(values) {
        return this.rep.book.create(values)
    }
}

module.exports = BookModule