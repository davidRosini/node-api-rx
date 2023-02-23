const endpoint = async (req, res, mod) => {
    try {
        const list = await mod.book.list()

        res.success(list)
    } catch(error) {
        console.log(error)
        res.error(error)
    }
}

module.exports = endpoint