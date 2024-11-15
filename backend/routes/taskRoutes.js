const express = require('express');
const { createTask, deleteTask, completeTask } = require('../controllers/taskController');
const router = express.Router();

router.post('/', createTask);
router.delete('/:id', deleteTask);
router.patch('/:id/complete', completeTask);

module.exports = router;
