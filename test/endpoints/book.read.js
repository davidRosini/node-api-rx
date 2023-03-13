module.exports = async (request, should, host) => {
    let authorId = ""
    let id = ""

    before(async() => {
        const resCreateAuthor = await request(host).post("/author").send({
            name: "Robert C. Martin"
        })
    
        authorId = resCreateAuthor.body.result.id

        const resCreateBook = await request(host).post("/book").send({
            name: "Clean Code",
            author_id: authorId,
            year: 2008,
            units: 5,
        })

        id = resCreateBook.body.result.id
    })

    it("It successfully executes /GET a book by uuid", async () => {
        should(authorId).not.equal(null)
        should(id).not.equal(null)

        const res = await request(host).get("/book/" + id)

        should(res.status).equal(200)
        should(res.body.result).not.equal(null)
        should(res.body.result.id).equal(id)
    })

    it("It should return bad request after executes /GET when book id is invalid", async () => {
        idInvalid = "xxxxxxxxx"

        const res = await request(host).get("/book/" + idInvalid)

        should(res.status).equal(400)
    })

    it("It should return bad request after executes /GET when book not found", async () => {
        idNotFound = "1e6cfe6a-273b-4099-adb0-7912a1afd87b"

        const res = await request(host).get("/book/" + idNotFound)

        should(res.status).equal(400)
    })
}