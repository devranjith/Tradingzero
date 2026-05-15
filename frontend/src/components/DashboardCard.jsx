import React from 'react';
import { motion } from 'framer-motion';

const DashboardCard = ({ title, value, subtitle, trend, delay = 0 }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="quantum-card p-6 flex flex-col gap-2 relative group"
    >
      <div className="absolute top-0 right-0 p-24 bg-gradient-to-br from-theme-accent/5 to-transparent rounded-full -mr-12 -mt-12 group-hover:scale-110 transition-transform duration-700 pointer-events-none" />
      
      <h3 className="text-theme-textMuted text-sm font-medium relative z-10">{title}</h3>
      <div className="flex items-end gap-3 relative z-10">
        <div className="text-3xl font-semibold text-white tracking-tight">{value}</div>
        {trend && (
          <div className={`text-sm font-medium mb-1 ${trend >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {trend >= 0 ? '+' : ''}{trend}%
          </div>
        )}
      </div>
      {subtitle && <div className="text-xs text-theme-textMuted mt-1 relative z-10">{subtitle}</div>}
    </motion.div>
  );
};

export default DashboardCard;
