import cron from 'node-cron';
import { runTradingCycle } from '../agents/tradingAgent.js';

export const startScheduler = () => {
  console.log('Starting trading scheduler...');
  
  // Run every 1 minute
  cron.schedule('* * * * *', async () => {
    try {
      await runTradingCycle();
    } catch (error) {
      console.error('Scheduler encountered an error:', error);
    }
  });
};
