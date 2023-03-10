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
  }

  const model = instance.define("author", schema, {
    ...shared.options,
  })

  return model
}
