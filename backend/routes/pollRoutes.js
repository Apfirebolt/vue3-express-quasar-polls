import express from 'express';
const router = express.Router();

import {
  getPolls,
} from '../controllers/pollController.js';

router.route('/').get(getPolls);

export default router;
