import express from 'express';
import { testcontroller } from '../controllers/imageController.js';

const router = express.Router();

router.get('/get', testcontroller);

export default router;