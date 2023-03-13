const uuid = require('uuid');

const endpoint = async (req, res, mod) => {
    try {
        const id = req.params.id

        if (!uuid.validate(id)) {
            throw new Error("Invalid id format")
        }

        const author = await mod.book.read(id)

        if (!author) {
            throw new Error("Book not found")
        }

        res.success(author)
    } catch(error) {
        console.log(error)
        res.error(error)
    }
}

module.exports = endpoint