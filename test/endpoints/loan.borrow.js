module.exports = async (request, should, host) => {
    let customer_id = "3d30f501-6364-41d6-b693-33c639e67fce"
    let book_id = ""

    before(async() => {
        const resCreateAuthor = await request(host).post("/author").send({
            name: "Steve Oualline"
        })
    
        authorId = resCreateAuthor.body.result.id

        const resCreateBook = await request(host).post("/book").send({
            name: "Practical C++ Programming",
            author_id: authorId,
            year: 2003,
            units: 1,
        })

        book_id = resCreateBook.body.result.id
    })

    it("It successfully executes /POST ", async () => {
        should(customer_id).not.equal(null)
        should(book_id).not.equal(null)

        const res = await request(host).post("/loan").send({
            customer_id,
            book_id,
            units: 1,
        })

        should(res.status).equal(200)
        should(res.body.result.id).not.equal(null)
    })

    it("It should return bad request on /POST when customer id is invalid", async () => {
        const res = await request(host).post("/loan").send({
            customer_id: "xxxxxxx",
            book_id,
            units: 1,
        })

        should(res.status).equal(400)
    })
    
    it("It should return bad request on /POST when book id is invalid", async () => {
        const res = await request(host).post("/loan").send({
            customer_id,
            book_id: "xxxxxxx",
            units: 1,
        })

        should(res.status).equal(400)
    })

    it("It should return bad request on /POST when units is invalid", async () => {
        should(customer_id).not.equal(null)
        should(book_id).not.equal(null)

        const res = await request(host).post("/loan").send({
            customer_id,
            book_id,
            units: 2,
        })

        should(res.status).equal(400)
    })

    it("It should return bad request on /POST when book is not found", async () => {
        should(customer_id).not.equal(null)
        should(book_id).not.equal(null)

        const res = await request(host).post("/loan").send({
            customer_id,
            book_id: "3d30f501-6364-41d6-b693-33c639e67fce",
            units: 1,
        })

        should(res.status).equal(400)
    })

    it("It should return bad request on /POST when book is out of units", async () => {
        should(customer_id).not.equal(null)
        should(book_id).not.equal(null)

        const res = await request(host).post("/loan").send({
            customer_id,
            book_id,
            units: 1,
        })

        should(res.status).equal(400)
    })
}