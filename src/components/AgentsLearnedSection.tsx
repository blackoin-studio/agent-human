import React, { useState } from 'react';
import { BookOpen, ExternalLink, FileCode, Check, Copy } from 'lucide-react';
import { RuleModal } from './RuleModal';

export const AgentsLearnedSection: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="rounded-2xl border border-[#172338] bg-[#0c1527] p-5 shadow-sm">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#152136]">
          <div className="flex items-center space-x-2">
            <BookOpen className="h-4 w-4 text-blue-400" />
            <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-300">
              WHAT THE AGENTS LEARNED
            </h2>
            <span className="text-[11px] text-[#6d7e95]">
              System rules added to prevent repeat failures
            </span>
          </div>

          <span className="text-[11px] font-mono text-slate-500">
            agents.md:L42
          </span>
        </div>

        {/* Rule Summary Box */}
        <div className="mt-3 flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-xl bg-[#09101f] border border-[#172338]">
          <div className="flex items-start space-x-3">
            <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-blue-950/60 text-blue-400 border border-blue-900/40">
              <FileCode className="h-3.5 w-3.5" />
            </div>

            <div>
              <p className="text-xs font-medium text-slate-100">
                &ldquo;Changes to message queries must pass a load check before merge.&rdquo;
              </p>
              <p className="mt-0.5 text-[11px] text-[#6e8098]">
                Added automatically after the search filter rollback (PR #491 post-mortem).
              </p>
            </div>
          </div>

          {/* View Rule Button */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="mt-2.5 sm:mt-0 flex items-center space-x-1.5 self-start sm:self-auto rounded-lg border border-[#1c2d49] bg-[#0e192f] px-3 py-1.5 text-xs font-medium text-blue-400 hover:text-blue-300 hover:border-blue-500/50 hover:bg-[#142340] transition-all"
          >
            <span>View rule</span>
            <ExternalLink className="h-3 w-3" />
          </button>
        </div>
      </div>

      {/* agents.md Rule Inspection Modal */}
      <RuleModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};
