module.exports = async (request, should, host) => {
    it("It successfully executes /POST ", async () => {
        const res = await request(host).post("/author").send({
            name: "author test"
        })
        
        should(res.status).equal(200)
    })

    it("It should return bad request when executes /POST ", async () => {
        const res = await request(host).post("/author").send({
            name: 12
        })
        
        should(res.status).equal(400)
    })
}