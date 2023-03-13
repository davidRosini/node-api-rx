const loanSchema = require('../validators/loanSchema')

const endpoint = async (req, res, mod) => {
    try {
        const {id} = req.params

        await loanSchema.validateAt("customer_id", {
            customer_id: id,
        })

        const loan = (await mod.loan.read(id))

        if (!loan) {
            throw new Error("Loan not found")
        }

        const book = await mod.book.read(loan.book_id)

        const bookUnits = book.units + loan.units

        const deleted = await mod.loan.delete(loan.id)

        await mod.book.update(loan.book_id, {
            units: bookUnits,
        })

        res.success(deleted)
    } catch(error) {
        console.log(error)
        res.error(error)
    }
}

module.exports = endpoint