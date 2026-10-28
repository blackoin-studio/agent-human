import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { StatItem } from '../types/dashboard';

interface StatCardProps {
  data: StatItem;
  onClick?: () => void;
}

export const StatCard: React.FC<StatCardProps> = ({ data, onClick }) => {
  const getBadgeStyle = () => {
    switch (data.badgeType) {
      case 'blue':
        return 'bg-[#142e58] text-[#71a7ff] border border-blue-500/20';
      case 'green':
        return 'bg-[#06382b] text-[#34d399] border border-emerald-500/20';
      case 'slate':
      default:
        return 'bg-[#151f33] text-[#8fa0b5] border border-slate-700/30';
    }
  };

  return (
    <div
      onClick={onClick}
      className="group relative rounded-2xl border border-[#172338] bg-[#0c1527] p-5 transition-all duration-200 hover:border-[#223555] hover:bg-[#0e192f] hover:shadow-lg cursor-pointer"
    >
      {/* Top Header Row: Title & Arrow */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-[#7c8ca3] group-hover:text-slate-300 transition-colors">
          {data.title}
        </span>
        <button
          type="button"
          aria-label={`Open ${data.title}`}
          className="flex h-6 w-6 items-center justify-center rounded-full bg-[#131d33] text-slate-400 group-hover:bg-[#1a2948] group-hover:text-white transition-colors"
        >
          <ArrowUpRight className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Main Metric Value */}
      <div className="mt-3.5 mb-3.5">
        <span className="text-3xl font-bold tracking-tight text-white">
          {data.value}
        </span>
      </div>

      {/* Footer Row: Badge & Description */}
      <div className="flex items-center space-x-2 text-xs">
        <span
          className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold tracking-wide ${getBadgeStyle()}`}
        >
          {data.badgeText}
        </span>
        <span className="text-[11px] text-[#78889e] truncate">
          {data.subtext}
        </span>
      </div>
    </div>
  );
};
