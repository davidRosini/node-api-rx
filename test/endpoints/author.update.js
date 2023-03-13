module.exports = async (request, should, host) => {
    let id = ""

    before(async() => {
        const resCreate = await request(host).post("/author").send({
            name: "Martin Fowler"
        })

        id = resCreate.body.result.id
    })

    it("It successfully executes /PATCH a author name", async () => {

        should(id).not.equal(null)

        const newName = "Andrew Hunt"

        const res = await request(host).patch("/author/" + id).send({
            name: newName
        })

        should(res.status).equal(200)
        should(res.body.result).not.equal(null)
        should(res.body.result.id).equal(id)
        should(res.body.result.name).equal(newName)
    })

    it("It should return bad request when executes /PATCH when author already exists", async () => {
        should(id).not.equal(null)
        const res = await request(host).patch("/author/" + id).send({
            name: "Andrew Hunt"
        })
        
        should(res.status).equal(400)
    })

    it("It should return bad request after executes /PATCH when author id is invalid", async () => {
        idInvalid = "xxxxxxxxx"

        const res = await request(host).get("/author/" + idInvalid)

        should(res.status).equal(400)
    })

    it("It should return bad request after executes /PATCH when author not found", async () => {
        idNotFound = "1e6cfe6a-273b-4099-adb0-7912a1afd87b"

        const res = await request(host).get("/author/" + idNotFound)

        should(res.status).equal(400)
    })
}