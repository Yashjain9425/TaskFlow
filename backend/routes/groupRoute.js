import express from 'express';
import authMiddleware from '../middleware/auth.js';
import {
  createGroup,
  getGroups,
  getGroupById,
  addMember,
  removeMember
} from '../controllers/groupController.js';

const groupRouter = express.Router();

// /api/groups
groupRouter.route('/gp')
  .get(authMiddleware, getGroups)       // List all groups for logged-in user
  .post(authMiddleware, createGroup);   // Create new group

// /api/groups/:id/gp
groupRouter.route('/:id/gp')
  .get(authMiddleware, getGroupById)    // Get single group details
  .put(authMiddleware, addMember)       // Add member to group
  .delete(authMiddleware, removeMember) // Remove member from group

export default groupRouter;
