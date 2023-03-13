const shared = require("../config/shared")

module.exports = (instance, dataTypes) => {
  const schema = {
    id: {
      allowNull: false,
      type: dataTypes.UUID,
      defaultValue: dataTypes.UUIDV4,
      primaryKey: true,
    },
    customer_id: {
      allowNull: false,
      type: dataTypes.UUID
    },
    book_id: {
      allowNull: false,
      type: dataTypes.UUID,
      references: {
        model: "book",
        key: "id",
      },
    },
    units: {
        allowNull: false,
        type: dataTypes.INTEGER,
    },
    ...shared.fields,
  }

  const model = instance.define("loan", schema, {
    ...shared.options,
  })

  return model
}
