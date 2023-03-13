module.exports = async (request, should, host) => {
    let authorId = ""
    let id = ""

    before(async() => {
        const resCreateAuthor = await request(host).post("/author").send({
            name: "Rob Miles"
        })
    
        authorId = resCreateAuthor.body.result.id

        const resCreateBook = await request(host).post("/book").send({
            name: "Begin to Code with Python",
            author_id: authorId,
            year: 2017,
            units: 5,
        })

        id = resCreateBook.body.result.id
    })

    it("It successfully executes /DELETE a book by uuid", async () => {
        should(authorId).not.equal(null)
        should(id).not.equal(null)

        const res = await request(host).delete("/book/" + id)

        should(res.status).equal(200)
        should(res.body.result).equal(1)
    })

    it("It should return bad request after executes /DELETE when book id is invalid", async () => {
        idInvalid = "xxxxxxxxx"

        const res = await request(host).delete("/book/" + idInvalid)

        should(res.status).equal(400)
    })

    it("It should return bad request after executes /DELETE when book was not found", async () => {
        idNotFound = "1e6cfe6a-273b-4099-adb0-7912a1afd87b"

        const res = await request(host).delete("/book/" + idNotFound)

        should(res.status).equal(400)
    })
}