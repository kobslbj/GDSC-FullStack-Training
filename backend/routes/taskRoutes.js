const express = require('express');
const { 
  createTask, 
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask, 
  completeTask 
} = require('../controllers/taskController');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

router.use(authMiddleware);

router.post('/', createTask);
router.get('/', getAllTasks);
router.get('/:id', getTaskById);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);
router.patch('/:id/complete', completeTask);

module.exports = router;
