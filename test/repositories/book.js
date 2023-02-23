module.exports = async(rep, should) => {
    let id = ""

    it("Create a book", () => {
        return rep.book.create({
            name: "Lord of the Rings",
            author: "Tolkien",
            units: 3,
            year: 1956,
        }).then((book) => {
            should(book.id).not.equal(null)
            id = book.id
        }).catch((error) => {
            console.log(error)
            throw error
        })
    })

    it("Read a book", () => {
        return rep.book.read(id).then((book) => {
            should(book.name).equal("Lord of the Rings")
        }).catch((error) => {
            console.log(error)
            throw error
        })
    })

    it("Update a book", () => {
        return rep.book.update(id, { 
            name: "LOTR: Fellowship of the Rings"
        }).then((book) => {
            should(book.name).equal("LOTR: Fellowship of the Rings")
        }).catch((error) => {
            console.log(error)
            throw error
        })
    })

    it("List all books", () => {
        return rep.book.list().then((books) => {
            should(books.length).equal(1)
        }).catch((error) => {
            console.log(error)
            throw error
        })
    })
}