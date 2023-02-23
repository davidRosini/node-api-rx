const endpoint = async (req, res, mod) => {
    try {
        const {name, author, year, units} = req.params

        const book = await mod.book.create({
            name, 
            author,
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