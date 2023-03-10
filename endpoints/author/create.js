const authorSchema = require('../validators/authorSchema')

const endpoint = async (req, res, mod) => {
    try {
        const {name} = req.params
console.log("name " + name)
        //TO DO: Validate data types and duplicated name
        const authorValid = await authorSchema.validate({
            name: name
        })
        console.log("valid  " + authorValid)
        const dupAuthor = await mod.author.findOneByName(name)

        console.log("valid  " + dupAuthor)
        if (dupAuthor) {
            throw new Error("Error duplicated author")
        }
        console.log("create " + name)
        const author = await mod.author.create({
            name,
        })
        console.log("success " + name)
        res.success(author)
    } catch(error) {
        console.log(error)
        res.error(error)
    }
}

module.exports = endpoint