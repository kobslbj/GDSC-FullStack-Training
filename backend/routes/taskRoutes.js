const express = require('express');
const { createTask, deleteTask, completeTask } = require('../controllers/taskController');
const router = express.Router();

router.post('/', authMiddleware, createTask);
router.delete('/:id', authMiddleware, deleteTask);
router.patch('/:id/complete', authMiddleware, completeTask);

module.exports = router;
