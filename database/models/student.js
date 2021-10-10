'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Student extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Student.hasMany(models.Assignment, {
        foreignKey: "student_Id",
        as: "student_Id",
      });
    }
  };
  Student.init({
    username: DataTypes.STRING,
    email: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Student',
  });
  return Student;
};