import React, { useState } from 'react';
import { Calendar, ChevronDown } from 'lucide-react';
import { TimeframeGranularity } from '../types/dashboard';

interface PointsChartProps {
  totalPoints?: number;
}

export const PointsChart: React.FC<PointsChartProps> = ({
  totalPoints = 7247,
}) => {
  const [selectedGranularity, setSelectedGranularity] =
    useState<TimeframeGranularity>('weekly');
  const [selectedRange, setSelectedRange] = useState('All dates');
  const [hoveredWeek, setHoveredWeek] = useState<number | null>(null);

  // 8 weeks data strictly matching the screenshot:
  // Week 1-6: 0 pts
  // Week 7: 7247 pts (with +8747 badge)
  // Week 8: 0 pts
  const weeksData = [
    { weekIndex: 1, label: 'W1', points: 0, date: 'Sep 01 - Sep 07' },
    { weekIndex: 2, label: 'W2', points: 0, date: 'Sep 08 - Sep 14' },
    { weekIndex: 3, label: 'W3', points: 0, date: 'Sep 15 - Sep 21' },
    { weekIndex: 4, label: 'W4', points: 0, date: 'Sep 22 - Sep 28' },
    { weekIndex: 5, label: 'W5', points: 0, date: 'Sep 29 - Oct 05' },
    { weekIndex: 6, label: 'W6', points: 0, date: 'Oct 06 - Oct 12' },
    {
      weekIndex: 7,
      label: 'W7',
      points: 7247,
      bonus: '+8747',
      date: 'Oct 13 - Oct 19',
      metGoal: true,
    },
    { weekIndex: 8, label: 'W8', points: 0, date: 'Oct 20 - Oct 27' },
  ];

  const maxPoints = 8000;
  const targetPoints = 500;
  // Calculate relative position for the 500 pts dashed target line
  const targetLinePercentage = (targetPoints / maxPoints) * 100;

  return (
    <div className="rounded-2xl border border-[#172338] bg-[#0c1527] p-6 shadow-sm">
      {/* Top Header Row */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        {/* Title and Subtitle */}
        <div>
          <h2 className="text-sm font-semibold tracking-wide text-white">
            Your points
          </h2>
          <p className="mt-0.5 text-xs text-[#788ba3]">
            Points earned each week, last 8 weeks · 500 pts required, more is welcome
          </p>
        </div>

        {/* Right Controls: Filter + Granularity + Total Points */}
        <div className="flex flex-wrap items-center gap-4">
          {/* Timeframe Filter Dropdown */}
          <button
            className="flex items-center space-x-2 rounded-lg border border-[#1c2c48] bg-[#0e182e] px-3 py-1.5 text-xs font-medium text-slate-300 hover:border-slate-500 hover:text-white transition-all shadow-sm"
          >
            <Calendar className="h-3.5 w-3.5 text-slate-400" />
            <span>{selectedRange}</span>
            <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
          </button>

          {/* Granularity Tabs */}
          <div className="flex items-center rounded-lg border border-[#18263f] bg-[#0a1222] p-1 text-xs">
            {(['daily', 'weekly', 'monthly', 'yearly'] as TimeframeGranularity[]).map(
              (item) => (
                <button
                  key={item}
                  onClick={() => setSelectedGranularity(item)}
                  className={`rounded-md px-3 py-1 capitalize transition-colors font-medium ${
                    selectedGranularity === item
                      ? 'bg-[#16243d] text-white shadow-sm border border-[#23375b]'
                      : 'text-[#6c7f99] hover:text-slate-200'
                  }`}
                >
                  {item}
                </button>
              )
            )}
          </div>

          {/* Total Points Display */}
          <div className="text-right pl-2 border-l border-[#192742]">
            <div className="text-2xl font-bold tracking-tight text-white leading-none">
              {totalPoints.toLocaleString()}
            </div>
            <div className="text-[11px] text-[#6d7f96] mt-1">
              pts in this range
            </div>
          </div>
        </div>
      </div>

      {/* Legend Row */}
      <div className="mt-6 flex flex-wrap items-center gap-6 text-xs text-[#7c8da3]">
        {/* Blue dot: 500 reached */}
        <div className="flex items-center space-x-2">
          <span className="h-2.5 w-2.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]"></span>
          <span>500 reached</span>
        </div>

        {/* Slate/Dark dot: Below 500 */}
        <div className="flex items-center space-x-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[#1b2b48]"></span>
          <span>Below 500</span>
        </div>

        {/* Dashed line: Weekly requirement - 500 pts */}
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1">
            <span className="h-0.5 w-2 bg-slate-500"></span>
            <span className="h-0.5 w-2 bg-slate-500"></span>
            <span className="h-0.5 w-2 bg-slate-500"></span>
          </div>
          <span>Weekly requirement · 500 pts</span>
        </div>
      </div>

      {/* Visual Bar Chart Section */}
      <div className="relative mt-8 pt-8 pb-4 h-64 w-full">
        {/* Weekly requirement dashed guide line at 500 pts */}
        <div
          className="absolute left-0 right-0 border-b border-dashed border-[#293c5d] z-0 flex items-center justify-between"
          style={{ bottom: `${Math.max(12, targetLinePercentage * 1.8)}%` }}
        >
          <span className="text-[10px] text-slate-500 font-mono pl-1 -translate-y-3">
            500 pts goal
          </span>
        </div>

        {/* Chart Columns Grid (8 columns) */}
        <div className="relative z-10 grid h-full grid-cols-8 items-end gap-2 sm:gap-6 px-2">
          {weeksData.map((week, idx) => {
            const hasPoints = week.points > 0;
            const heightPercent = hasPoints
              ? Math.min(90, Math.max(15, (week.points / maxPoints) * 100))
              : 0;

            const isHovered = hoveredWeek === idx;

            return (
              <div
                key={week.weekIndex}
                onMouseEnter={() => setHoveredWeek(idx)}
                onMouseLeave={() => setHoveredWeek(null)}
                className="group relative flex flex-col items-center justify-end h-full cursor-pointer"
              >
                {/* Floating Tooltip */}
                {isHovered && (
                  <div className="absolute -top-12 z-30 whitespace-nowrap rounded-lg border border-[#23375b] bg-[#081020] px-2.5 py-1.5 shadow-2xl text-[11px] text-white">
                    <p className="font-semibold text-blue-400">
                      {week.points} pts
                    </p>
                    <p className="text-[10px] text-slate-400">{week.date}</p>
                  </div>
                )}

                {/* Point badge / tag above bar if present (Week 7 +8747 badge) */}
                {week.bonus && (
                  <div className="mb-1 flex flex-col items-center transition-transform group-hover:-translate-y-1">
                    <span className="rounded bg-[#064e3b] px-1.5 py-0.5 text-[10px] font-bold text-[#34d399] shadow-sm">
                      {week.bonus}
                    </span>
                    <span className="text-[11px] font-bold text-white mt-0.5">
                      {week.points}
                    </span>
                  </div>
                )}

                {/* Vertical Bar or Zero Baseline Dot */}
                {hasPoints ? (
                  <div
                    style={{ height: `${heightPercent}%` }}
                    className="w-10 sm:w-14 rounded-t-lg bg-gradient-to-t from-[#1d4ed8] via-[#2563eb] to-[#3b82f6] shadow-[0_0_15px_rgba(59,130,246,0.25)] transition-all duration-200 group-hover:brightness-110"
                  />
                ) : (
                  <div className="flex flex-col items-center">
                    <span className="text-xs font-semibold text-slate-400 mb-2">
                      0
                    </span>
                    <div className="h-2 w-2 rounded-full bg-[#1b2b48] group-hover:bg-[#2c436b] transition-colors" />
                  </div>
                )}

                {/* X-axis Zero marker line beneath each column */}
                <div className="mt-2 h-0.5 w-full bg-[#142036]" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
