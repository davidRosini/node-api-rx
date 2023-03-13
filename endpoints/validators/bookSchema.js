const yup = require('yup')
const { validate: uuidValidator } = require('uuid');

yup.addMethod(yup.string, "UUIDV4", function (errorMessage) {
    return this.test(`test-uuid-valid`, function (value) {
        const { path, createError } = this;

        return (
            uuidValidator(value) ||
            createError({ path, message: "Invalid uuid" })
        );
    });
});

const bookSchema = yup.object({
    name: yup.string().matches("[A-Za-z]").required(),
    author_id: yup.string().UUIDV4().required(), 
    year:  yup.number().min(1).max(9999).required(),
    units:  yup.number().min(1).max(999).required(),
});

module.exports = bookSchema