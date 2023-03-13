module.exports = async (request, should, host) => {
    let authorId = ""

    before(async() => {
        const resCreate = await request(host).post("/author").send({
            name: "Dave Thomas"
        })
    
        authorId = resCreate.body.result.id
    })

    it("It successfully executes /POST ", async () => {
        should(authorId).not.equal(null)

        const res = await request(host).post("/book").send({
            name: "Pragmatic Programmer, The: Your journey to mastery",
            author_id: authorId,
            year: 2019,
            units: 5,
        })

        should(res.status).equal(200)
        should(res.body.result.id).not.equal(null)
    })

    it("It should return bad request on /POST when author id is invalid", async () => {
        const res = await request(host).post("/book").send({
            name: "Pragmatic Programmer, The: Your journey to mastery",
            author_id: "xxxxxxx",
            year: 2019,
            units: 5,
        })

        should(res.status).equal(400)
    })

    it("It should return bad request on /POST when year is invalid", async () => {
        should(authorId).not.equal(null)

        const res = await request(host).post("/book").send({
            name: "Pragmatic Programmer, The: Your journey to mastery",
            author_id: authorId,
            year: 10000,
            units: 5,
        })

        should(res.status).equal(400)
    })

    it("It should return bad request on /POST when units is invalid", async () => {
        should(authorId).not.equal(null)

        const res = await request(host).post("/book").send({
            name: "Pragmatic Programmer, The: Your journey to mastery",
            author_id: authorId,
            year: 2019,
            units: 1000,
        })

        should(res.status).equal(400)
    })

    it("It should return bad request when executes /POST when book already exists", async () => {
        should(authorId).not.equal(null)

        const res = await request(host).post("/book").send({
            name: "Pragmatic Programmer, The: Your journey to mastery",
            author_id: authorId,
            year: 2019,
            units: 4,
        })

        should(res.status).equal(400)
    })

    it("It should return bad request when executes /POST when author dont exists", async () => {
        const res = await request(host).post("/book").send({
            name: "Clean Architecture",
            author_id: "3d30f501-6364-41d6-b693-33c639e67fce",
            year: 2019,
            units: 4,
        })

        should(res.status).equal(400)
    })
}