import React, { useEffect } from 'react';
import {
  X,
  CheckCircle2,
  AlertTriangle,
  GitPullRequest,
  Bot,
  Zap,
  RotateCcw,
  Clock,
  Layers,
  Shield,
  Megaphone
} from 'lucide-react';
import { DrillDownData } from '../types/dashboard';

interface DrillDownPanelProps {
  data: DrillDownData | null;
  onClose: () => void;
}

export const DrillDownPanel: React.FC<DrillDownPanelProps> = ({ data, onClose }) => {
  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!data) return null;

  const getPillarIcon = () => {
    switch (data.pillar) {
      case 'Product':
        return <Layers className="h-3.5 w-3.5 text-blue-400" />;
      case 'Marketing':
        return <Megaphone className="h-3.5 w-3.5 text-pink-400" />;
      case 'Security':
        return <Shield className="h-3.5 w-3.5 text-emerald-400" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity animate-fade-in"
      />

      <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
        <div className="w-screen max-w-lg transform border-l border-[#1b2b48] bg-[#0c1527] shadow-2xl transition-all duration-300 ease-in-out flex flex-col">
          
          {/* Header */}
          <div className="flex items-start justify-between border-b border-[#18263f] p-6 pb-5">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <span className="inline-flex items-center space-x-1.5 rounded-md border border-[#1d2f50] bg-[#101b33] px-2 py-0.5 text-[11px] font-medium text-slate-300">
                  {getPillarIcon()}
                  <span>{data.pillar}</span>
                </span>

                <span
                  className={`inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-semibold ${
                    data.status === 'Live'
                      ? 'bg-[#064e3b] text-[#34d399] border border-emerald-500/20'
                      : data.status === 'Rolled Back'
                      ? 'bg-rose-950/60 text-rose-300 border border-rose-800/40'
                      : 'bg-amber-950/60 text-amber-300 border border-amber-800/40'
                  }`}
                >
                  {data.status === 'Rolled Back' ? 'Rolled Back' : 'Live in Production'}
                </span>

                <span className="text-xs font-mono text-slate-500">
                  {data.prNumber}
                </span>
              </div>

              <h2 className="text-base font-semibold leading-snug text-white">
                {data.title}
              </h2>
            </div>

            <button
              onClick={onClose}
              className="rounded-lg p-1 text-slate-400 hover:bg-[#15233e] hover:text-white transition-colors"
              title="Close panel (Esc)"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            
            {/* Plain language summary */}
            <div className="rounded-xl border border-[#17253d] bg-[#081020] p-4 text-xs text-slate-300 leading-relaxed">
              <span className="font-semibold text-white block mb-1">Outcome summary</span>
              {data.summary}
            </div>

            {/* Agents Involved & Consensus */}
            <div className="rounded-xl border border-[#17253d] bg-[#091122] p-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#152138]">
                <div className="flex items-center space-x-2">
                  <Bot className="h-4 w-4 text-blue-400" />
                  <span className="text-xs font-semibold text-white">Agents Involved</span>
                </div>
                <span className="text-[11px] font-medium text-slate-400">
                  {data.consensusResult}
                </span>
              </div>

              <div className="mt-3 space-y-2.5">
                {data.agentsInvolved.map((agent, i) => (
                  <div key={i} className="flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-2">
                      <div className="h-2 w-2 rounded-full bg-blue-400" />
                      <span className="text-slate-200">{agent.name}</span>
                      <span className="text-[10px] text-slate-500 font-mono">({agent.role})</span>
                    </div>
                    <span
                      className={`text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded ${
                        agent.vote === 'approve'
                          ? 'text-emerald-400 bg-emerald-950/40'
                          : agent.vote === 'reject'
                          ? 'text-rose-400 bg-rose-950/40'
                          : 'text-slate-400 bg-slate-800'
                      }`}
                    >
                      {agent.vote}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Vertical Lifecycle Timeline (7 Steps) */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Clock className="h-4 w-4 text-slate-400" />
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Execution Timeline
                </h3>
              </div>

              <div className="relative pl-6 space-y-6 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-0.5 before:bg-[#1a2b49]">
                {data.timeline.map((step, idx) => {
                  const isCompleted = step.status === 'completed';
                  const isFailed = step.status === 'failed';
                  const isWarning = step.status === 'warning';

                  return (
                    <div key={idx} className="relative group">
                      {/* Timeline Node Dot */}
                      <div
                        className={`absolute -left-[19px] top-0.5 flex h-4 w-4 items-center justify-center rounded-full border ${
                          isCompleted
                            ? 'border-emerald-500 bg-[#064e3b] text-emerald-300'
                            : isFailed
                            ? 'border-rose-500 bg-rose-950 text-rose-300'
                            : isWarning
                            ? 'border-amber-500 bg-amber-950 text-amber-300'
                            : 'border-blue-500 bg-[#0a162d] text-blue-400'
                        }`}
                      >
                        {isCompleted ? (
                          <CheckCircle2 className="h-2.5 w-2.5" />
                        ) : isFailed ? (
                          <RotateCcw className="h-2.5 w-2.5" />
                        ) : (
                          <div className="h-1.5 w-1.5 rounded-full bg-current" />
                        )}
                      </div>

                      {/* Timeline Content */}
                      <div className="text-xs">
                        <div className="flex items-center justify-between">
                          <span
                            className={`font-semibold ${
                              isFailed
                                ? 'text-rose-300'
                                : isCompleted
                                ? 'text-white'
                                : 'text-slate-300'
                            }`}
                          >
                            {step.title}
                          </span>
                          <span className="text-[11px] font-mono text-slate-500">
                            {step.timestamp}
                          </span>
                        </div>
                        <p className="mt-0.5 text-[11px] text-[#76879e]">
                          {step.subtitle}
                        </p>

                        {step.details && (
                          <div className="mt-1.5 rounded-lg border border-[#17253d] bg-[#070e1c] p-2 text-[10px] text-slate-400 font-mono">
                            {step.details}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Footer */}
          <div className="border-t border-[#18263f] p-4 bg-[#091122] flex items-center justify-between text-xs">
            <span className="text-[#6d7e95]">Autonomous verification complete</span>
            <button
              onClick={onClose}
              className="rounded-lg border border-[#1e2f4e] bg-[#0d162a] px-3.5 py-1.5 font-medium text-slate-300 hover:text-white hover:border-slate-500 transition-colors"
            >
              Done
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
