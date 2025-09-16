import express from 'express';
import authMiddleware from '../middleware/auth.js';
import {
  createGroupTask,
  getGroupTasks,
  getGroupTaskById,
  updateGroupTask,
  deleteGroupTask
} from '../controllers/groupTaskController.js';

const groupTaskRouter = express.Router();

// /api/group-tasks
groupTaskRouter.route('/gp/:groupId')
  .get(authMiddleware, getGroupTasks)      // Get all tasks for a group
  .post(authMiddleware, createGroupTask);  // Create a task for a group

// /api/group-tasks/:id/gp
groupTaskRouter.route('/:id/gp')
  .get(authMiddleware, getGroupTaskById)   // Get single group task
  .put(authMiddleware, updateGroupTask)    // Update group task
  .delete(authMiddleware, deleteGroupTask) // Delete group task

export default groupTaskRouter;