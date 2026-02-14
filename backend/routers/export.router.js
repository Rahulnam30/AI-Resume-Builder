import express from 'express';
import { exportFile } from '../controllers/export.controller.js';

const router = express.Router();

router.post('/export', exportFile);

export default router;
