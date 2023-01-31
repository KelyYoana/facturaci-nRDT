'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class invoices extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.clients,{
        foreignKey:'idClient'
      })
      // this.hasMany(models.inoicesBrands,{
      //   foreignKey:'idInvoice'
      // })
      this.belongsToMany(models.brands,{
        through:models.inoicesBrands,
        foreignKey:'idInvoice'
      })
    }
  }
  invoices.init({
    date: DataTypes.DATE,
    idClient: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'invoices',
    freezeTableName: true,
    name:{
      singular:'invoices',
      plural: 'invoices'
    }
  });
  return invoices;
};