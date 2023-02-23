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
   /* available: {
      type: dataTypes.VIRTUAL,
      get() {
        if (!this.loan) {
          return null
        }

        const orders = this.order_products.map((order_product) => order_product.order)
        if (orders.some((order) => order == null)) {
          return null
        }

        return uniqueShipments
          .map((shipment) => shipment.pickup_location)
          .filter((pickup_location) => pickup_location != null)
      },
    },*/
  }

  const model = instance.define("book", schema, {
    tableName: "book",
    ...shared.options,
  })

  return model
}
