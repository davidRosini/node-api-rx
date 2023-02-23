const { DataTypes } = require("sequelize")

module.exports = {
  options: {
    timestamps: true,
    paranoid: true,
    underscored: true,
    schema: "public",
    freezeTableName: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
  },
  fields: {
    created_at: {
      allowNull: true,
      type: DataTypes.DATE(3),
      default: DataTypes.DATE(3),
    },
    updated_at: {
      allowNull: true,
      type: DataTypes.DATE(3),
      default: DataTypes.DATE(3),
    },
    deleted_at: {
      allowNull: true,
      type: DataTypes.DATE(3),
      default: DataTypes.DATE(3),
    },
  },
}
