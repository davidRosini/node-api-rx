module.exports = async(mod, should) => {
    let id = ""
    let author_id = ""

    before(async() => {
        author_id = (await mod.author.list())[0].id
    })

    it("Creates a book", async () => {
        const book = await mod.book.create({
            name: "Lord of the Rings module",
            author_id,
            units: 3,
            year: 1956,
        })
        should(book.id).not.equal(null)
        id = book.id
    })

    it("Reads a book", async () => {
        const book = await mod.book.read(id)
        should(book.name).equal("Lord of the Rings module")
    })

    it("Reads a book by name", async () => {
        const book = await mod.book.findOneByName("Lord of the Rings module")
        should(book.id).equal(id)
    })

    it("Updates a book", async () => {
        const book = await mod.book.update(id, { 
            name: "LOTR: Fellowship of the Rings module"
        })
        should(book.name).equal("LOTR: Fellowship of the Rings module")
    })

    it("List all books", async () => {
        const books = await mod.book.list()
        should(books.length).equal(2)
    })

    it("Delete a book", async () => {
        should(id).not.equal(null)

        const deleted = await mod.book.delete(id)
        should(deleted).equal(1)
    })
}