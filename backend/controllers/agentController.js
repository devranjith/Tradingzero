import { runTradingCycle } from '../agents/tradingAgent.js';

export const runAgentManually = async (req, res) => {
  try {
    // Verify Vercel CRON_SECRET
    const authHeader = req.headers.authorization;
    if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // We can pass a specific userId if we want to run the agent for a single user
    // or run it globally if we have a system user for the bot.
    const result = await runTradingCycle();
    res.json({ message: 'Agent cycle completed', result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAgentStatus = (req, res) => {
  res.json({ status: 'running', next_run: 'in 1 minute' }); // Basic mock
};
