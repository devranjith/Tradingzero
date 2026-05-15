import React, { useState } from 'react';
import { Search, Bell, Command, User } from 'lucide-react';
import DashboardCard from '../components/DashboardCard';
import ChartWidget from '../components/ChartWidget';
import ActiveSignal from '../components/ActiveSignal';
import TradeHistoryTable from '../components/TradeHistoryTable';

const Topbar = () => (
  <div className="flex justify-between items-center mb-8">
    <div className="flex gap-4">
      <div className="quantum-card px-4 py-2 text-xs text-theme-textMuted flex gap-2">
        <span>Market Cap:</span> <span className="text-green-500">+1.42%</span>
      </div>
      <div className="quantum-card px-4 py-2 text-xs text-theme-textMuted flex gap-2">
        <span>24h Vol:</span> <span className="text-green-500">+6.21%</span>
      </div>
      <div className="quantum-card px-4 py-2 text-xs text-theme-textMuted flex gap-2">
        <span>Active Bot:</span> <span className="text-white">Gemini Trader</span>
      </div>
    </div>

    <div className="flex items-center gap-4">
      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-theme-textMuted" />
        <input 
          type="text" 
          placeholder="Search..." 
          className="bg-theme-card border border-theme-border rounded-full py-2 pl-10 pr-12 text-sm text-white focus:outline-none focus:border-theme-accent w-64"
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-theme-textMuted text-xs">
          <Command size={12} /> K
        </div>
      </div>
      <button className="w-10 h-10 rounded-full border border-theme-border flex items-center justify-center text-theme-textMuted hover:text-white transition-colors">
        <Bell size={18} />
      </button>
      <div className="quantum-card px-4 py-2 flex items-center gap-2 cursor-pointer">
        <div className="w-6 h-6 rounded-full bg-theme-accent flex items-center justify-center">
          <User size={14} className="text-white" />
        </div>
        <span className="text-sm text-white">0x7cdb...</span>
      </div>
    </div>
  </div>
);

const Dashboard = () => {
  const [mockSignal] = useState({
    action: 'BUY',
    confidence: 85,
    reason: "RSI is 32 (oversold). MACD bullish crossover approaching. Strong support level met."
  });

  const [mockTrades] = useState([
    { id: 1, symbol: 'BTCUSDT', action: 'BUY', entry_price: 64200, exit_price: null, profit_loss: 900, status: 'OPEN', opened_at: new Date(Date.now() - 86400000).toISOString() },
    { id: 2, symbol: 'SOLUSDT', action: 'SELL', entry_price: 145, exit_price: 140, profit_loss: 50, status: 'CLOSED', opened_at: new Date(Date.now() - 172800000).toISOString() },
    { id: 3, symbol: 'ETHUSDT', action: 'BUY', entry_price: 3300, exit_price: 3250, profit_loss: -50, status: 'CLOSED', opened_at: new Date(Date.now() - 259200000).toISOString() }
  ]);

  return (
    <div className="space-y-6 pb-12">
      <Topbar />

      <h2 className="text-2xl font-bold text-white tracking-wide mb-6">Overview</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column (Charts and Stats) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="quantum-card p-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-sm font-medium text-theme-textMuted mb-2">Total Balance</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-white tracking-tight">$43 255</span>
                  <span className="text-xl font-medium text-theme-textMuted">.38</span>
                </div>
                <div className="text-xs text-theme-textMuted mt-2">BTC - SOL - ETH</div>
              </div>
              <div className="flex bg-theme-bg rounded-lg p-1 border border-theme-border">
                <button className="px-4 py-1.5 text-xs font-medium bg-theme-card text-white rounded-md shadow-sm">Actual</button>
                <button className="px-4 py-1.5 text-xs font-medium text-theme-textMuted hover:text-white">AI Predicted</button>
              </div>
            </div>
            
            <div className="h-[300px] -mx-2">
              <ChartWidget />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <DashboardCard title="Total Profit" value="+$12,450" trend={14.5} />
             <DashboardCard title="Win Rate" value="68.5%" trend={2.4} />
          </div>
        </div>

        {/* Right Column (AI Signal Widget) */}
        <div className="lg:col-span-1 h-full">
          <ActiveSignal signal={mockSignal} />
        </div>
      </div>

      {/* Bottom Table */}
      <div className="quantum-card p-6 mt-6">
        <TradeHistoryTable trades={mockTrades} />
      </div>

    </div>
  );
};

export default Dashboard;
