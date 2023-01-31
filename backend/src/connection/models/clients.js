'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class clients extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
     this.hasMany(models.invoices,{
      foreignKey:'idClient'
     })
    }
  }
  clients.init({
    name: DataTypes.STRING,
    surName: DataTypes.STRING,
    direction: DataTypes.STRING,
    dateBirth: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
    category: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'clients',
    freezeTableName: true,
    name:{
      singular: 'clients',
      plural: 'clients',
    }
  });
  return clients;
};