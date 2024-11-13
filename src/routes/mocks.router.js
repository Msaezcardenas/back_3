import { Router } from 'express';
import mockingController from '../controllers/mocking.controller.js';

const router = Router();

router.get('/mockingpets', (req, res) => {});

router.get('/mockingusers', mockingController.getUserMocking);
export default router;
