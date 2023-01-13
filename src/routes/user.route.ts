import express from 'express';
import {
  deleteItemHandler,
  getAllUsersHandler,
  getMeHandler,
  addItemHandler,
  getUserItemsHandler,
  deleteSearchHandler,
  addSearchHandler,
} from '../controllers/user.controller';
import { deserializeUser } from '../middleware/deserializeUser';
import { requireUser } from '../middleware/requireUser';
import { restrictTo } from '../middleware/restrictTo';

const router = express.Router();

router.use(deserializeUser, requireUser);

// Admin Get Users route
router.get('/', restrictTo('admin'), getAllUsersHandler);

// Get my info route
router.get('/me', getMeHandler);
router.get('/me/items/:userId', getUserItemsHandler);
router.put('/me/addItem/:userId', addItemHandler);
router.put('/me/deleteItem/:userId', deleteItemHandler);
router.put('/me/deleteSearch/:userId', deleteSearchHandler);
router.put('/me/addSearch/:userId', addSearchHandler);

export default router;