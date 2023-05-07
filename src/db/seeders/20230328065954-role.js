"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      "role",
      [
        {
          id: "9010a499-d5fb-4d4b-b6c3-8c39d27f0b0e",
          role_name: "SUPER_ADMIN",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        {
          id: "446d39ee-a374-462b-932c-850bb2cc7613",
          role_name: "ADMIN",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        {
          id: "de5923ae-aef4-4700-b2d3-a01ec5b3ebe2",
          role_name: "MANAGER",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        {
          id: "c31aea46-28b7-434e-85ac-19bf565e1064",
          role_name: "CUSTOMER",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ],
      {}
    );
  },
  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
