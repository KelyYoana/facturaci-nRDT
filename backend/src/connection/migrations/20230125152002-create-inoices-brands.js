'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('inoicesBrands', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idInvoice: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
          model:'invoices',
          key:'id'
        }
      },
      idBrand: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
          model:'brands',
          key:'id'
        }
      },
      productQuantity:{
        type: Sequelize.STRING
      },
      total:{
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('inoicesBrands');
  }
};