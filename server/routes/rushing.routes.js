import { Router } from 'express';
import * as RushingController from '../controllers/rushing.controller';
const router = new Router();

// Get all Rushings
router.route('/rushings').get(RushingController.getRushings);

export default router;
