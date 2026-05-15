import express from 'express';
import { runAgentManually, getAgentStatus } from '../controllers/agentController.js';

const router = express.Router();

router.get('/run', runAgentManually);
router.get('/status', getAgentStatus);

export default router;
