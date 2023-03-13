const uuid = require('uuid');
const bookSchema = require('../validators/bookSchema')

const endpoint = async (req, res, mod) => {
    try {
        const id = req.params.id

        if (!uuid.validate(id)) {
            throw new Error("Invalid id format")
        }

        const {name, year, units} = req.params

        if (name) {
            await bookSchema.validateAt("name", {
                name: name
            })

            const dupBook = await mod.book.findOneByName(name)

            if (dupBook) {
                throw new Error("Error duplicated book")
            }
        }

        if (year) {
            await bookSchema.validateAt("year", {
                year: year
            })
        }

        if (units) {
            await bookSchema.validateAt("units", {
                units: units
            })
        }

        const book = await mod.book.update(id, {
            name, 
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