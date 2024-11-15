const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Task = sequelize.define('Task', {
  task_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  task_description: {
    type: DataTypes.STRING,
  },
  is_completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = Task;
