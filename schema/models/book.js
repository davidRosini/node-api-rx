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
    author_id: {
      allowNull: false,
      type: dataTypes.UUID,
      references: {
        model: "author",
        key: "id",
      },
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
    ...shared.options,
  })

  return model
}
