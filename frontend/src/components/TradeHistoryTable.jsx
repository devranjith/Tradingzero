import React from 'react';

const TradeHistoryTable = ({ trades }) => {
  return (
    <div className="w-full">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="text-theme-textMuted text-xs uppercase tracking-wider border-b border-theme-border/50">
            <th className="px-4 py-4 font-medium">Asset</th>
            <th className="px-4 py-4 font-medium text-center">Type</th>
            <th className="px-4 py-4 font-medium text-right">Entry Price</th>
            <th className="px-4 py-4 font-medium text-right">Profit/Loss</th>
            <th className="px-4 py-4 font-medium text-right">Status</th>
            <th className="px-4 py-4 font-medium text-right">Date</th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {trades.map((trade) => (
            <tr key={trade.id} className="border-b border-theme-border/20 hover:bg-white/[0.02] transition-colors group">
              <td className="px-4 py-5 font-medium text-white flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#f7931a]/10 flex items-center justify-center text-[#f7931a] font-bold text-xs">
                  {trade.symbol.charAt(0)}
                </div>
                <div>
                  <div>{trade.symbol.replace('USDT', '')}</div>
                  <div className="text-xs text-theme-textMuted font-normal">{trade.symbol}</div>
                </div>
              </td>
              <td className="px-4 py-5 text-center">
                <span className={`text-xs font-semibold ${
                  trade.action === 'BUY' ? 'text-green-500' : 'text-red-500'
                }`}>
                  {trade.action}
                </span>
              </td>
              <td className="px-4 py-5 text-right text-white">
                ${trade.entry_price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </td>
              <td className={`px-4 py-5 text-right font-medium ${
                trade.profit_loss >= 0 ? 'text-green-500' : 'text-red-500'
              }`}>
                {trade.profit_loss >= 0 ? '+' : ''}${Math.abs(trade.profit_loss).toLocaleString()}
              </td>
              <td className="px-4 py-5 text-right">
                 <span className={`text-xs px-2 py-1 rounded-md ${
                  trade.status === 'OPEN' ? 'bg-theme-accent/20 text-theme-accent' : 'bg-gray-800 text-gray-400'
                }`}>
                  {trade.status}
                </span>
              </td>
              <td className="px-4 py-5 text-right text-theme-textMuted text-xs">
                {new Date(trade.opened_at).toLocaleDateString()}
              </td>
            </tr>
          ))}
          {trades.length === 0 && (
            <tr>
              <td colSpan="6" className="px-4 py-8 text-center text-theme-textMuted">
                No recent trades found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TradeHistoryTable;
