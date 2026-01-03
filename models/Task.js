// models/Task.js
module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define("Task", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("Todo", "In Progress", "Completed"),
      defaultValue: "Todo",
      allowNull: false,
    },
  });

  return Task;
};

