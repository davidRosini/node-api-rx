module.exports = async (request, should, host) => {
    let id = ""

    before(async() => {
        const resCreate = await request(host).post("/author").send({
            name: "Robert C. Martin"
        })

        id = resCreate.body.result.id
    })

    it("It successfully executes /DELETE a author by uuid", async () => {
        should(id).not.equal(null)

        const res = await request(host).delete("/author/" + id)

        should(res.status).equal(200)
        should(res.body.result).equal(1)
    })

    it("It should return bad request after executes /DELETE when author id is invalid", async () => {
        idInvalid = "xxxxxxxxx"

        const res = await request(host).delete("/author/" + idInvalid)

        should(res.status).equal(400)
    })

    it("It should return bad request after executes /DELETE when author not found", async () => {
        idNotFound = "1e6cfe6a-273b-4099-adb0-7912a1afd87b"

        const res = await request(host).delete("/author/" + idNotFound)

        should(res.status).equal(400)
    })
}