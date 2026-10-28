import React from 'react';
import { AlertOctagon, RotateCcw, ArrowRight, ShieldCheck } from 'lucide-react';

interface WentWrongSectionProps {
  onSelectItem: (drillDownId: string) => void;
}

export const WentWrongSection: React.FC<WentWrongSectionProps> = ({ onSelectItem }) => {
  return (
    <div className="rounded-2xl border border-rose-950/40 bg-[#0c1527] p-5 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#18233a]">
        <div className="flex items-center space-x-2">
          <div className="h-2 w-2 rounded-full bg-rose-400" />
          <h2 className="text-xs font-semibold uppercase tracking-wider text-rose-300">
            WENT WRONG
          </h2>
          <span className="text-[11px] text-[#6d7e95]">
            Incidents detected & recovered by agents
          </span>
        </div>

        {/* Status chip: Handled */}
        <span className="inline-flex items-center space-x-1 rounded-full border border-emerald-500/30 bg-[#063b2f] px-2.5 py-0.5 text-[11px] font-semibold text-[#34d399]">
          <ShieldCheck className="h-3 w-3" />
          <span>Handled</span>
        </span>
      </div>

      {/* Incident Item Card */}
      <div
        onClick={() => onSelectItem('dd-rollback-search')}
        className="group mt-3 flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-xl bg-[#09101f] border border-[#172338] hover:border-rose-900/40 hover:bg-[#0e1628] cursor-pointer transition-colors"
      >
        <div className="flex items-start space-x-3">
          <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-rose-950/60 text-rose-400 border border-rose-900/40">
            <RotateCcw className="h-3.5 w-3.5" />
          </div>

          <div>
            <p className="text-xs font-medium text-slate-200 group-hover:text-white">
              Rolled back: search filter change slowed channel loading (+400ms).
            </p>
            <p className="mt-0.5 text-[11px] text-[#74859c]">
              Synthetic load check tripped threshold. Issue reopened and assigned to an agent.
            </p>
          </div>
        </div>

        <div className="mt-2 sm:mt-0 flex items-center space-x-2 self-end sm:self-auto shrink-0">
          <span className="text-[11px] text-blue-400 font-medium group-hover:underline">
            View rollback logs
          </span>
          <ArrowRight className="h-3 w-3 text-blue-400" />
        </div>
      </div>
    </div>
  );
};
