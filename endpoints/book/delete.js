const uuid = require('uuid');

const endpoint = async (req, res, mod) => {
    try {
        const id = req.params.id

        if (!uuid.validate(id)) {
            throw new Error("Invalid id format")
        }

        const deleted = await mod.book.delete(id)

        if (deleted == 0) {
            throw new Error("Book not found")
        }

        res.success(deleted)
    } catch(error) {
        console.log(error)
        res.error(error)
    }
}

module.exports = endpoint