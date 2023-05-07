"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("user", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      unique_id: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
      },
      is_email_verified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      country_code: {
        type: Sequelize.STRING,
      },
      mobile_number: {
        type: Sequelize.STRING,
        unique: true,
      },
      is_mobile_verified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      company_name: {
        type: Sequelize.STRING,
      },
      user_name: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      account_status: {
        type: Sequelize.ENUM("ACTIVE", "INACTIVE"),
      },
      profile_picture: {
        type: Sequelize.TEXT,
      },
      fcm_token: {
        type: Sequelize.TEXT,
      },
      approved_on: {
        type: Sequelize.DATE,
      },
      address: {
        type: Sequelize.JSONB,
      },
      country_id: {
        type: Sequelize.UUID,
        references: {
          model: "country",
          schema: "schema",
          key: "id",
        },
      },
      password: {
        type: Sequelize.STRING,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      deleted_at: {
        allowNull: true,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("user");
  },
};
