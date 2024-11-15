const Task = require('../models/Task');

exports.createTask = async (req, res) => {
  const { taskName, taskDescription } = req.body;
  const task = await Task.create({ task_name: taskName, task_description: taskDescription });
  res.json(task);
};

exports.deleteTask = async (req, res) => {
  const { id } = req.params;
  await Task.destroy({ where: { id } });
  res.sendStatus(204);
};

exports.completeTask = async (req, res) => {
  const { id } = req.params;
  await Task.update({ is_completed: true }, { where: { id } });
  res.sendStatus(200);
};
