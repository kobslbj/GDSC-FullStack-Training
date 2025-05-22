const Task = require('../models/Task');

exports.createTask = async (req, res) => {
  try {
    const { taskName, taskDescription } = req.body;
    const task = await Task.create({ 
      task_name: taskName, 
      task_description: taskDescription,
      user_id: req.user.id
    });
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: 'Create task failed', error: error.message });
  }
};

exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll({
      where: { user_id: req.user.id },
      order: [['createdAt', 'DESC']]
    });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Get tasks failed', error: error.message });
  }
};

exports.getTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findOne({
      where: { 
        id,
        user_id: req.user.id
      }
    });
    
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: 'Get task details failed', error: error.message });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { taskName, taskDescription } = req.body;
    
    const task = await Task.findOne({
      where: { 
        id,
        user_id: req.user.id
      }
    });

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    await task.update({
      task_name: taskName,
      task_description: taskDescription
    });

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: 'Update task failed', error: error.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findOne({
      where: { 
        id,
        user_id: req.user.id
      }
    });

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    await task.destroy();
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ message: 'Delete task failed', error: error.message });
  }
};

exports.completeTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findOne({
      where: { 
        id,
        user_id: req.user.id
      }
    });

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    await task.update({ is_completed: true });
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: 'Complete task failed', error: error.message });
  }
};
