import React, { useState } from 'react';
import { X, Check, Copy, FileText, Sparkles } from 'lucide-react';

interface RuleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RuleModal: React.FC<RuleModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const ruleMarkdown = `# agents.md (Autonomous Agent Operating Principles)

## Rule 42: Database & Query Performance Guardrails
- Severity: CRITICAL / BLOCKING
- Triggered by: Incident INC-948 (Search filter latency regression)
- Added by: PostMortemSynthesizer Agent at 04:15 UTC

\`\`\`markdown
### Rule 42.1: Message Query Load Check
All pull requests modifying SQL query plans or index mappings under 
\`apps/core/queries/messages.ts\` MUST execute synthetic load test:
\`\`\`bash
npm run benchmark:query-plan --target=staging
\`\`\`
Threshold: Median latency p95 MUST stay below 45ms under 5k concurrent queries.
If p95 exceeds 45ms, consensus fails automatically and escalation is blocked.
\`\`\``;

  const handleCopy = () => {
    navigator.clipboard.writeText(ruleMarkdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl rounded-2xl border border-[#1e2f4e] bg-[#0c1527] shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#17253d] px-6 py-4">
          <div className="flex items-center space-x-2">
            <FileText className="h-4 w-4 text-blue-400" />
            <span className="text-sm font-semibold text-white">
              agents.md · Learned Rule #42
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleCopy}
              className="flex items-center space-x-1.5 rounded-lg border border-[#1c2c48] bg-[#0e182e] px-2.5 py-1 text-xs text-slate-300 hover:text-white"
            >
              {copied ? (
                <>
                  <Check className="h-3 w-3 text-emerald-400" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy className="h-3 w-3" />
                  <span>Copy</span>
                </>
              )}
            </button>
            <button
              onClick={onClose}
              className="rounded-lg p-1 text-slate-400 hover:bg-[#15233e] hover:text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Markdown Content */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs font-mono">
          <div className="rounded-xl border border-[#16253d] bg-[#080e1b] p-4 text-slate-300 space-y-3 leading-relaxed">
            <div className="flex items-center justify-between border-b border-[#142035] pb-2 text-[11px] text-slate-400">
              <span>Path: /agents.md</span>
              <span className="text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded">
                Active in production
              </span>
            </div>
            
            <p className="text-blue-400 font-semibold text-sm">
              ## Rule 42: Database & Query Performance Guardrails
            </p>
            
            <p className="text-slate-400">
              Changes to message queries must pass a load check before merge.
            </p>

            <div className="rounded-lg bg-[#050912] p-3 text-[11px] text-amber-300/90 border border-amber-900/30">
              <span className="font-semibold block mb-1 text-amber-400">CI Verification Command:</span>
              <code>npm run benchmark:query-plan --target=staging --max-p95=45ms</code>
            </div>

            <p className="text-slate-400">
              If median latency exceeds 45ms (+400ms anomaly threshold), autonomous merge is prohibited and the issue is automatically assigned to the Performance Bot.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-[#17253d] px-6 py-3 bg-[#091122] flex items-center justify-between text-xs">
          <div className="flex items-center space-x-2 text-[#728399]">
            <Sparkles className="h-3.5 w-3.5 text-blue-400" />
            <span>Learned through autonomous rollback & telemetry evaluation</span>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg bg-blue-600 px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-blue-500 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
