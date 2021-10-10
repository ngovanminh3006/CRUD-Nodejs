'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('Assignments', {
      fields: ['student_Id'],
      type: 'foreign key',
      name: 'custom_fkey_constraint_student_Id',
      references: { //Required field
        table: 'Students',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('Assignments', 'custom_fkey_constraint_student_Id' )
  }
};
