import React, { useEffect, useState } from 'react';
import { DollarSign, Percent, Briefcase, Activity } from 'lucide-react';
import DashboardCard from '../components/DashboardCard';
import ChartWidget from '../components/ChartWidget';
import ActiveSignal from '../components/ActiveSignal';
import TradeHistoryTable from '../components/TradeHistoryTable';

const Dashboard = () => {
  // Mock data for initial MVP display
  const [mockSignal, setMockSignal] = useState({
    action: 'BUY',
    confidence: 85,
    reason: "RSI is currently at 32, indicating oversold conditions. MACD shows a bullish crossover approaching. Strong support level at current price."
  });

  const [mockTrades] = useState([
    { id: 1, symbol: 'BTCUSDT', action: 'BUY', entry_price: 64200, exit_price: 65100, profit_loss: 900, opened_at: new Date(Date.now() - 86400000).toISOString() },
    { id: 2, symbol: 'BTCUSDT', action: 'SELL', entry_price: 66000, exit_price: 65500, profit_loss: 500, opened_at: new Date(Date.now() - 172800000).toISOString() },
    { id: 3, symbol: 'BTCUSDT', action: 'BUY', entry_price: 63000, exit_price: 62500, profit_loss: -500, opened_at: new Date(Date.now() - 259200000).toISOString() }
  ]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard 
          title="Total Profit" 
          value="$12,450" 
          icon={DollarSign} 
          trend={14.5} 
        />
        <DashboardCard 
          title="Win Rate" 
          value="68.5%" 
          icon={Percent} 
          trend={2.4} 
        />
        <DashboardCard 
          title="Active Trades" 
          value="3" 
          icon={Briefcase} 
        />
        <DashboardCard 
          title="AI Status" 
          value="Running" 
          icon={Activity} 
          subtitle="Next check in 45s"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ChartWidget />
        </div>
        <div className="lg:col-span-1">
          <ActiveSignal signal={mockSignal} />
        </div>
      </div>

      <div className="grid grid-cols-1">
        <TradeHistoryTable trades={mockTrades} />
      </div>
    </div>
  );
};

export default Dashboard;
