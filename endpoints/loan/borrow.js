const loanSchema = require('../validators/loanSchema')

const endpoint = async (req, res, mod) => {
    try {
        const {customer_id, book_id, units} = req.params

        await loanSchema.validate({
            customer_id, 
            book_id,
            units,
        })

        const book = await mod.book.read(book_id)

        if (!book) {
            throw new Error("Book not found")
        }

        if (book.units == 0) {
            throw new Error("Not enough book units to be borrow")
        }

        const loan = await mod.loan.create({
            customer_id,
            book_id,
            units,
        })

        const bookUnits = book.units - units

        await mod.book.update(book_id, {
            units: bookUnits,
        })

        res.success(loan)
    } catch(error) {
        console.log(error)
        res.error(error)
    }
}

module.exports = endpoint