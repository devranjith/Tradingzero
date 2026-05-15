import express from 'express';
import { getTradeHistory, getActiveTrades, closeTrade } from '../controllers/tradeController.js';

const router = express.Router();

router.get('/history/:userId', getTradeHistory);
router.get('/active/:userId', getActiveTrades);
router.post('/close/:tradeId', closeTrade);

export default router;
