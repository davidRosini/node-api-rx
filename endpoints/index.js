const endpoint = (req, res, next) => {
    try {
        res.success({
            message: "Api Up!"
        })
        
        return next()
    } catch(error) {
        res.error(error)
        return next(false)
    }
}

module.exports = endpoint