module.exports = async(mod, should) => {
    let customer_id = "3d30f501-6364-41d6-b693-33c639e67fce"
    let book_id = ""
    let id = ""

    before(async() => {
        book_id = (await mod.book.list())[0].id
    })

    it("Creates a loan", async () => {
        const loan = await mod.loan.create({
            customer_id,
            book_id,
            units: 1,
        })
        should(loan.id).not.equal(null)
        id = loan.id
    })

    it("Reads a loan", async () => {
        const loan = await mod.loan.read(id)
        should(loan.customer_id).equal(customer_id)
        should(loan.book_id).equal(book_id)
    })

    it("Updates a loan", async () => {
        const loan = await mod.loan.update(id, { 
            units: 0
        })
        should(loan.units).equal(0)
    })

    it("List all loans", async () => {
        const loan = await mod.loan.list()
        should(loan.length).equal(1)
    })

    it("Delete a loan", async () => {
        should(id).not.equal(null)

        const deleted = await mod.loan.delete(id)
        should(deleted).equal(1)
    })
}