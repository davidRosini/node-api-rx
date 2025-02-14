const authorSchema = require('../validators/authorSchema')

const endpoint = async (req, res, mod) => {
    try {
        const {name} = req.params

        await authorSchema.validate({
            name: name
        })

        const dupAuthor = await mod.author.findOneByName(name)

        if (dupAuthor) {
            throw new Error("Error duplicated author")
        }

        const author = await mod.author.create({
            name,
        })

        res.success(author)
    } catch(error) {
        console.log(error)
        res.error(error)
    }
}

module.exports = endpoint