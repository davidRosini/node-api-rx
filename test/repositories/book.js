module.exports = async(rep, should) => {
    let id = ""
    let author_id = ""

    before(async() => {
        author_id = (await rep.author.list())[0].id
    })

    it("Creates a book", async () => {
        const book = await rep.book.create({
            name: "Lord of the Rings",
            author_id,
            units: 3,
            year: 1956,
        })
        should(book.id).not.equal(null)
        id = book.id
    })

    it("Reads a book", async () => {
        const book = await rep.book.read(id)
        should(book.name).equal("Lord of the Rings")
    })

    it("Reads a book by name", async () => {
        const book = await rep.book.findOneByName("Lord of the Rings")
        should(book.id).equal(id)
    })

    it("Updates a book", async () => {
        const book = await rep.book.update(id, { 
            name: "LOTR: Fellowship of the Rings"
        })
        should(book.name).equal("LOTR: Fellowship of the Rings")
    })

    it("List all books", async () => {
        const books = await rep.book.list()
        should(books.length).equal(1)
    })

    it("Delete a book", async () => {
        const book = await rep.book.create({
            name: "Lord of the Rings delete",
            author_id,
            units: 3,
            year: 1956,
        })
        should(book.id).not.equal(null)

        const deleted = await rep.book.delete(book.id)
        should(deleted).equal(1)
    })
}