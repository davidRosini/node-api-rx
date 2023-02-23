const shared = require("../config/shared")

module.exports = (instance, dataTypes) => {
  const schema = {
    id: {
      allowNull: false,
      type: dataTypes.UUID,
      defaultValue: dataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      allowNull: false,
      type: dataTypes.STRING,
    },
    author: {
        allowNull: false,
        type: dataTypes.STRING,
    },
    year: {
        allowNull: false,
        type: dataTypes.INTEGER,
    },
    units: {
        allowNull: false,
        type: dataTypes.INTEGER,
    },
    ...shared.fields,
  }

  const model = instance.define("book", schema, {
    tableName: "book",
    ...shared.options,
  })

  return model
}
