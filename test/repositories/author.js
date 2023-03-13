module.exports = async(rep, should) => {
    let id = ""

    it("Creates an author", async () => {
        const author = await rep.author.create({
            name: "JRR Tolkien",
        })
        should(author.id).not.equal(null)
        id = author.id
    })

    it("Reads an author", async () => {
        const author = await rep.author.read(id)
        should(author.name).equal("JRR Tolkien")
    })

    it("Reads an author by name", async () => {
        const author = await rep.author.findOneByName("JRR Tolkien")
        should(author.id).equal(id)
    })

    it("Updates an author", async () => {
        const author = await rep.author.update(id, { 
            name: "J.R.R Tokien"
        })
        should(author.name).equal("J.R.R Tokien")
    })

    it("List all authors", async () => {
        const authors = await rep.author.list()
        should(authors.length).equal(1)
    })

    it("Delete a author", async () => {
        const author = await rep.author.create({
            name: "JRR Tolkien delete",
        })
        should(author.id).not.equal(null)

        const deleted = await rep.author.delete(author.id)
        should(deleted).equal(1)
    })
}