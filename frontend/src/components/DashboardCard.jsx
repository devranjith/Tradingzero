import React from 'react';

const DashboardCard = ({ title, value, subtitle, trend }) => {
  return (
    <div className="quantum-card p-6 flex flex-col gap-2">
      <h3 className="text-theme-textMuted text-sm font-medium">{title}</h3>
      <div className="flex items-end gap-3">
        <div className="text-3xl font-semibold text-white tracking-tight">{value}</div>
        {trend && (
          <div className={`text-sm font-medium mb-1 ${trend >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {trend >= 0 ? '+' : ''}{trend}%
          </div>
        )}
      </div>
      {subtitle && <div className="text-xs text-theme-textMuted mt-1">{subtitle}</div>}
    </div>
  );
};

export default DashboardCard;
