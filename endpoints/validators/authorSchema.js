const yup = require('yup')

const authorSchema = yup.object({
    name: yup.string().matches("\\w").required(),
});

module.exports = authorSchema