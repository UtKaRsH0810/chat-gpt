'use strict';
const { Model } = require('sequelize');
const {
  generateHashPassword,
  generateCustomerPassword,
  generateUniqueId,
} = require('../helpers/hooks');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  user.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      unique_id: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
      },
      is_email_verified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      country_code: {
        type: DataTypes.STRING,
      },
      mobile_number: {
        type: DataTypes.STRING,
      },
      is_mobile_verified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      company_name: {
        type: DataTypes.STRING,
      },
      user_name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      account_status: {
        type: DataTypes.ENUM('ACTIVE', 'INACTIVE'),
      },
      profile_picture: {
        type: DataTypes.TEXT,
      },
      fcm_token: {
        type: DataTypes.TEXT,
      },
      approved_on: {
        type: DataTypes.DATE,
      },
      address: {
        type: DataTypes.JSONB,
      },
      country_id: {
        type: DataTypes.UUID,
      },
      password: {
        type: DataTypes.STRING,
      },
      created_at: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updated_at: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      deleted_at: {
        allowNull: true,
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: 'user',
      freezeTableName: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: 'deleted_at',
      paranoid: true,
      defaultScope: {
        attributes: {
          exclude: ['password'],
        },
      },
      hooks: {
        beforeCreate: async (record, options) => {
          record.dataValues.unique_id = await generateUniqueId();
          record.dataValues.user_name = record.dataValues.email;
          record.dataValues.password = await generateCustomerPassword({
            name: record.dataValues.name,
            mobile_number: record.dataValues.mobile_number,
          });
          record.dataValues.password = await generateHashPassword(
            record.dataValues.password
          );
        },
      },
    }
  );
  return user;
};
