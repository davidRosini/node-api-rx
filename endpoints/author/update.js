const uuid = require('uuid');
const authorSchema = require('../validators/authorSchema')

const endpoint = async (req, res, mod) => {
    try {
        const id = req.params.id

        if (!uuid.validate(id)) {
            throw new Error("Invalid id format")
        }

        const {name} = req.params

        await authorSchema.validate({
            name: name
        })

        const dupAuthor = await mod.author.findOneByName(name)

        if (dupAuthor) {
            throw new Error("Error duplicated author")
        }

        const author = await mod.author.update(id, {
            name,
        })

        res.success(author)
    } catch(error) {
        console.log(error)
        res.error(error)
    }
}

module.exports = endpoint