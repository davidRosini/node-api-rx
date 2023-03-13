const yup = require('yup')

const authorSchema = yup.object({
    name: yup.string().matches("[A-Za-z]").required(),
});

module.exports = authorSchema