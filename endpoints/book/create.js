const endpoint = async (req, res, mod) => {
    try {
        const {name, author_id, year, units} = req.params

        //TO DO: Validate data types and author

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