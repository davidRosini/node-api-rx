module.exports = async (request, should, host) => {
    let customer_id = "3d30f501-6364-41d6-b693-33c639e67fce"
    let book_id = ""
    let id = ""

    before(async() => {
        const resCreateAuthor = await request(host).post("/author").send({
            name: "Dmitry Jemerov"
        })
    
        authorId = resCreateAuthor.body.result.id

        const resCreateBook = await request(host).post("/book").send({
            name: "Kotlin em ação",
            author_id: authorId,
            year: 2017,
            units: 1,
        })
        
        book_id = resCreateBook.body.result.id

        const resLoan = await request(host).post("/loan").send({
            customer_id,
            book_id,
            units: 1,
        })

        id = resLoan.body.result.id
    })

    it("It successfully executes /PATCH ", async () => {
        should(id).not.equal(null)

        const res = await request(host).patch("/loan/" + id)

        should(res.status).equal(200)
        should(res.body.result).equal(1)
    })

    it("It should return bad request after executes /PATCH when loan id is invalid", async () => {
        idInvalid = "xxxxxxxxx"

        const res = await request(host).patch("/loan/" + idInvalid)

        should(res.status).equal(400)
    })

    it("It should return bad request after executes /PATCH when loan was not found", async () => {
        idNotFound = "1e6cfe6a-273b-4099-adb0-7912a1afd87b"

        const res = await request(host).patch("/loan/" + idNotFound)

        should(res.status).equal(400)
    })
}