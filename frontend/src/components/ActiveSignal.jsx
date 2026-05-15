import React from 'react';
import { Bot, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { motion } from 'framer-motion';

const ActiveSignal = ({ signal }) => {
  if (!signal) return null;

  const getActionColor = (action) => {
    switch(action) {
      case 'BUY': return 'text-green-400 bg-green-500/10 border-green-500/20';
      case 'SELL': return 'text-red-400 bg-red-500/10 border-red-500/20';
      default: return 'text-gray-400 bg-gray-500/10 border-gray-500/20';
    }
  };

  const getActionIcon = (action) => {
    switch(action) {
      case 'BUY': return <TrendingUp size={24} />;
      case 'SELL': return <TrendingDown size={24} />;
      default: return <Minus size={24} />;
    }
  };

  return (
    <div className="glass p-6 rounded-2xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-blue-500/10 rounded-lg">
          <Bot className="text-blue-400" size={20} />
        </div>
        <h2 className="text-lg font-semibold text-white">Latest AI Signal</h2>
      </div>

      <div className="flex flex-col md:flex-row gap-6 items-center">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className={`w-32 h-32 rounded-full flex flex-col items-center justify-center border-4 ${getActionColor(signal.action)}`}
        >
          {getActionIcon(signal.action)}
          <span className="text-2xl font-bold mt-1">{signal.action}</span>
        </motion.div>

        <div className="flex-1 space-y-4 w-full">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-400">Confidence</span>
              <span className="text-white font-medium">{signal.confidence}%</span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-1000" 
                style={{ width: `${signal.confidence}%` }}
              ></div>
            </div>
          </div>

          <div className="bg-white/5 p-4 rounded-xl border border-white/5">
            <h4 className="text-sm font-medium text-gray-300 mb-2">Reasoning</h4>
            <p className="text-sm text-gray-400 leading-relaxed">
              {signal.reason}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActiveSignal;
