const endpoint = async (req, res, mod) => {
    try {
        const {name} = req.params

        //TO DO: Validate data types and duplicated name

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