const bookSchema = require('../validators/bookSchema')

const endpoint = async (req, res, mod) => {
    try {
        const {name, author_id, year, units} = req.params

        await bookSchema.validate({
            name, 
            author_id,
            year,
            units,
        })

        const dupBook = await mod.book.findOneByName(name)

        if (dupBook) {
            throw new Error("Error duplicated book")
        }

        const book = await mod.book.create({
            name, 
            author_id,
            year,
            units,
        })

        res.success(book)
    } catch(error) {
        console.log(error)
        res.error(error)
    }
}

module.exports = endpoint