module.exports = async (request, should, host) => {
    let authorId = ""
    let id = ""

    before(async() => {
        const resCreateAuthor = await request(host).post("/author").send({
            name: "Erich Gamma"
        })
    
        authorId = resCreateAuthor.body.result.id

        const resCreateBook = await request(host).post("/book").send({
            name: "Design Patterns",
            author_id: authorId,
            year: 1994,
            units: 5,
        })

        id = resCreateBook.body.result.id
    })

    it("It successfully executes /PATCH a book name", async () => {
        should(authorId).not.equal(null)
        should(id).not.equal(null)

        const newName = "Design Patterns: Elements of Reusable Object-Oriented Software"

        const res = await request(host).patch("/book/" + id).send({
            name: newName
        })

        should(res.status).equal(200)
        should(res.body.result).not.equal(null)
        should(res.body.result.id).equal(id)
        should(res.body.result.name).equal(newName)
    })

    it("It successfully executes /PATCH a book year", async () => {
        should(authorId).not.equal(null)
        should(id).not.equal(null)

        const newYear = 1999

        const res = await request(host).patch("/book/" + id).send({
            year: newYear
        })

        should(res.status).equal(200)
        should(res.body.result).not.equal(null)
        should(res.body.result.id).equal(id)
        should(res.body.result.year).equal(newYear)
    })

    it("It successfully executes /PATCH a book units", async () => {
        should(authorId).not.equal(null)
        should(id).not.equal(null)

        const newUnits = 8

        const res = await request(host).patch("/book/" + id).send({
            units: newUnits
        })

        should(res.status).equal(200)
        should(res.body.result).not.equal(null)
        should(res.body.result.id).equal(id)
        should(res.body.result.units).equal(newUnits)
    })

    it("It should return bad request when executes /PATCH when book already exists", async () => {
        const res = await request(host).patch("/book/" + id).send({
            name: "Design Patterns: Elements of Reusable Object-Oriented Software"
        })
        
        should(res.status).equal(400)
    })

    it("It should return bad request after executes /PATCH when book id is invalid", async () => {
        idInvalid = "xxxxxxxxx"

        const res = await request(host).get("/book/" + idInvalid)

        should(res.status).equal(400)
    })

    it("It should return bad request after executes /PATCH when book not found", async () => {
        idNotFound = "1e6cfe6a-273b-4099-adb0-7912a1afd87b"

        const res = await request(host).get("/book/" + idNotFound)

        should(res.status).equal(400)
    })
}