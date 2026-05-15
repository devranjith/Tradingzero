import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

const TradeHistoryTable = ({ trades }) => {
  return (
    <div className="glass rounded-2xl overflow-hidden">
      <div className="p-6 border-b border-gray-800/50">
        <h2 className="text-lg font-semibold text-white">Recent Trades</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-gray-400 text-sm border-b border-gray-800/50 bg-white/5">
              <th className="px-6 py-4 font-medium">Asset</th>
              <th className="px-6 py-4 font-medium">Type</th>
              <th className="px-6 py-4 font-medium">Entry Price</th>
              <th className="px-6 py-4 font-medium">Exit Price</th>
              <th className="px-6 py-4 font-medium">P/L</th>
              <th className="px-6 py-4 font-medium">Time</th>
            </tr>
          </thead>
          <tbody className="text-sm divide-y divide-gray-800/50">
            {trades.map((trade) => (
              <tr key={trade.id} className="hover:bg-white/5 transition-colors">
                <td className="px-6 py-4 font-medium text-white">{trade.symbol}</td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-1 rounded-md text-xs font-medium ${
                    trade.action === 'BUY' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'
                  }`}>
                    {trade.action}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-300">${trade.entry_price.toLocaleString()}</td>
                <td className="px-6 py-4 text-gray-300">
                  {trade.exit_price ? `$${trade.exit_price.toLocaleString()}` : '-'}
                </td>
                <td className="px-6 py-4">
                  <div className={`flex items-center gap-1 font-medium ${
                    trade.profit_loss >= 0 ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {trade.profit_loss >= 0 ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                    ${Math.abs(trade.profit_loss).toLocaleString()}
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-500">
                  {new Date(trade.opened_at).toLocaleDateString()}
                </td>
              </tr>
            ))}
            {trades.length === 0 && (
              <tr>
                <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                  No recent trades found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TradeHistoryTable;
