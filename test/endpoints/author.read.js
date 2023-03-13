module.exports = async (request, should, host) => {
    let id = ""

    before(async() => {
        const resCreate = await request(host).post("/author").send({
            name: "George R. R. Martin"
        })

        id = resCreate.body.result.id
    })

    it("It successfully executes /GET a author by uuid", async () => {

        should(id).not.equal(null)

        const res = await request(host).get("/author/" + id)

        should(res.status).equal(200)
        should(res.body.result).not.equal(null)
        should(res.body.result.id).equal(id)
    })

    it("It should return bad request after executes /GET when author id is invalid", async () => {
        idInvalid = "xxxxxxxxx"

        const res = await request(host).get("/author/" + idInvalid)

        should(res.status).equal(400)
    })

    it("It should return bad request after executes /GET when author not found", async () => {
        idNotFound = "1e6cfe6a-273b-4099-adb0-7912a1afd87b"

        const res = await request(host).get("/author/" + idNotFound)

        should(res.status).equal(400)
    })
}