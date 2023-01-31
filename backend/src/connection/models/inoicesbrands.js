'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class inoicesBrands extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.invoices,{
        foreignKey:'idInvoice'
      })
      this.belongsTo(models.brands,{
        foreignKey:'idBrand'
      })
    }
  }
  inoicesBrands.init({
    idInvoice: DataTypes.INTEGER,
    idBrand: DataTypes.INTEGER,
    productQuantity:DataTypes.STRING,
    total:DataTypes.STRING
  }, {
    sequelize,
    modelName: 'inoicesBrands',
    freezeTableName: true,
    name:{
      singular:'inoicesBrands',
      plural: 'inoicesBrands'
    }
  });
  return inoicesBrands;
};