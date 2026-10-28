import React from 'react';
import { Activity, Clock } from 'lucide-react';

interface InFlightPulseProps {
  inProgressCount?: number;
  waitingChecksCount?: number;
}

export const InFlightPulse: React.FC<InFlightPulseProps> = ({
  inProgressCount = 6,
  waitingChecksCount = 2,
}) => {
  return (
    <div className="flex items-center justify-between rounded-xl border border-[#16233a] bg-[#091122]/90 px-4 py-2.5 text-xs shadow-sm">
      <div className="flex items-center space-x-3">
        {/* Animated Pulse Radar Dot */}
        <div className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75"></span>
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]"></span>
        </div>

        <div className="flex items-center space-x-2">
          <span className="font-semibold uppercase tracking-wider text-[11px] text-slate-400">
            IN FLIGHT
          </span>
          <span className="text-slate-500">·</span>
          <span className="font-medium text-slate-200">
            {inProgressCount} issues in progress, {waitingChecksCount} waiting on checks.
          </span>
        </div>
      </div>

      <div className="hidden sm:flex items-center space-x-2 text-[11px] text-[#6d7f99]">
        <Clock className="h-3 w-3" />
        <span>Next verification in 18s</span>
      </div>
    </div>
  );
};
