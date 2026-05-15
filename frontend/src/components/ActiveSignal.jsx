import React from 'react';
import { RefreshCcw } from 'lucide-react';

const ActiveSignal = ({ signal }) => {
  if (!signal) return null;

  return (
    <div className="quantum-card p-6 w-full max-w-md mx-auto relative flex flex-col h-full">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-lg font-semibold text-white">AI Analysis</h2>
      </div>

      <div className="space-y-4 mb-6 flex-1">
        <div className="bg-theme-bg p-4 rounded-xl border border-theme-border relative">
          <div className="text-xs text-theme-textMuted mb-2">Recommended Action</div>
          <div className="flex justify-between items-end">
            <div className={`text-3xl font-semibold ${
              signal.action === 'BUY' ? 'text-green-500' : 
              signal.action === 'SELL' ? 'text-red-500' : 'text-gray-400'
            }`}>
              {signal.action}
            </div>
            <div className="text-sm text-theme-textMuted flex items-center gap-1">
              Confidence <span className="text-white font-medium">{signal.confidence}%</span>
            </div>
          </div>
        </div>

        {/* Decorative swap icon similar to the reference image */}
        <div className="absolute left-1/2 top-[42%] -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-theme-card border border-theme-border rounded-full flex items-center justify-center z-10">
          <RefreshCcw size={14} className="text-theme-textMuted" />
        </div>

        <div className="bg-theme-bg p-4 rounded-xl border border-theme-border">
          <div className="text-xs text-theme-textMuted mb-2">AI Reasoning</div>
          <p className="text-sm text-gray-300 leading-relaxed min-h-[60px]">
            {signal.reason}
          </p>
        </div>
      </div>

      <div className="mt-auto space-y-4">
        <div className="flex justify-between text-xs text-theme-textMuted px-1">
          <span>Target Asset</span>
          <span className="text-white">BTC/USDT</span>
        </div>
        <div className="flex justify-between text-xs text-theme-textMuted px-1 mb-4">
          <span>Powered by</span>
          <span className="text-white">Gemini 1.5 Flash</span>
        </div>

        <button className="w-full quantum-button py-4 text-base tracking-wide shadow-[0_0_20px_rgba(255,138,0,0.15)]">
          {signal.action === 'HOLD' ? 'Waiting for Signal' : `Execute ${signal.action} Order`}
        </button>
      </div>
    </div>
  );
};

export default ActiveSignal;
