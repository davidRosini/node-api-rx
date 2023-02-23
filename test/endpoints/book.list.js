module.exports = async (request, should) => {
    it("It successfully executes /GET ", (done) => {
        request("localhost:3000")
            .get("/book")
            .end((err, res) => {
                should(res.body.result.length).equal(1)
                done()
            })    
    })
}