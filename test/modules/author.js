module.exports = async(mod, should) => {
    let id = ""

    it("Creates an author", async () => {
        const author = await mod.author.create({
            name: "JRR Tolkien module",
        })
        should(author.id).not.equal(null)
        id = author.id
    })

    it("Reads an author", async () => {
        const author = await mod.author.read(id)
        should(author.name).equal("JRR Tolkien module")
    })

    it("Reads an author by name", async () => {
        const author = await mod.author.findOneByName("JRR Tolkien module")
        should(author.id).equal(id)
    })

    it("Updates an author", async () => {
        const author = await mod.author.update(id, { 
            name: "J.R.R Tokien module"
        })
        should(author.name).equal("J.R.R Tokien module")
    })

    it("List all authors", async () => {
        const authors = await mod.author.list()
        should(authors.length).equal(2)
    })

    it("Delete a author", async () => {
        should(id).not.equal(null)

        const deleted = await mod.author.delete(id)
        should(deleted).equal(1)
    })
}