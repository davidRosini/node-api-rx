const yup = require('yup')

const loanSchema = yup.object({
    customer_id: yup.string().UUIDV4().required(), 
    book_id: yup.string().UUIDV4().required(), 
    units:  yup.number().min(1).max(1).required(),
});

module.exports = loanSchema