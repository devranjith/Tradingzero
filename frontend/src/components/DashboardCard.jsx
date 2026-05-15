import React from 'react';
import { motion } from 'framer-motion';

const DashboardCard = ({ title, value, subtitle, icon: Icon, trend }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass p-6 rounded-2xl flex flex-col gap-4 relative overflow-hidden group"
    >
      <div className="absolute top-0 right-0 p-32 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-700 pointer-events-none" />
      
      <div className="flex justify-between items-start">
        <div className="p-3 bg-white/5 rounded-xl">
          <Icon className="text-blue-400" size={24} />
        </div>
        {trend && (
          <div className={`px-2.5 py-1 rounded-lg text-sm font-medium ${trend >= 0 ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
            {trend >= 0 ? '+' : ''}{trend}%
          </div>
        )}
      </div>

      <div>
        <h3 className="text-gray-400 text-sm font-medium mb-1">{title}</h3>
        <div className="text-2xl font-bold text-white mb-1">{value}</div>
        {subtitle && <div className="text-xs text-gray-500">{subtitle}</div>}
      </div>
    </motion.div>
  );
};

export default DashboardCard;
