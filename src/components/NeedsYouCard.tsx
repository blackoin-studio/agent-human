import React, { useState } from 'react';
import {
  Check,
  X,
  Share2,
  AlertCircle,
  HelpCircle,
  Layers,
  Megaphone,
  Shield,
  ArrowRight
} from 'lucide-react';
import { NeedsYouItem } from '../types/dashboard';

interface NeedsYouCardProps {
  item: NeedsYouItem;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  onRedirect: (id: string, target: string) => void;
}

export const NeedsYouCard: React.FC<NeedsYouCardProps> = ({
  item,
  onApprove,
  onReject,
  onRedirect,
}) => {
  const [isDismissing, setIsDismissing] = useState(false);
  const [actionType, setActionType] = useState<'approve' | 'reject' | 'redirect' | null>(null);
  const [showRedirectInput, setShowRedirectInput] = useState(false);
  const [redirectTarget, setRedirectTarget] = useState('');

  const handleAction = (type: 'approve' | 'reject') => {
    setActionType(type);
    setIsDismissing(true);
    setTimeout(() => {
      if (type === 'approve') onApprove(item.id);
      if (type === 'reject') onReject(item.id);
    }, 280);
  };

  const handleRedirectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!redirectTarget.trim()) return;
    setActionType('redirect');
    setIsDismissing(true);
    setTimeout(() => {
      onRedirect(item.id, redirectTarget);
    }, 280);
  };

  const getPillarBadge = () => {
    switch (item.pillar) {
      case 'Product':
        return (
          <span className="inline-flex items-center space-x-1.5 rounded-md border border-blue-500/20 bg-blue-950/40 px-2 py-0.5 text-[11px] font-medium text-blue-300">
            <Layers className="h-3 w-3 text-blue-400" />
            <span>Product</span>
          </span>
        );
      case 'Marketing':
        return (
          <span className="inline-flex items-center space-x-1.5 rounded-md border border-pink-500/20 bg-pink-950/40 px-2 py-0.5 text-[11px] font-medium text-pink-300">
            <Megaphone className="h-3 w-3 text-pink-400" />
            <span>Marketing</span>
          </span>
        );
      case 'Security':
        return (
          <span className="inline-flex items-center space-x-1.5 rounded-md border border-emerald-500/20 bg-emerald-950/40 px-2 py-0.5 text-[11px] font-medium text-emerald-300">
            <Shield className="h-3 w-3 text-emerald-400" />
            <span>Security</span>
          </span>
        );
    }
  };

  return (
    <div
      className={`rounded-2xl border border-[#1b2b48] bg-[#0c1527] p-5 shadow-sm transition-all duration-300 ${
        isDismissing
          ? 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
          : 'opacity-100 scale-100 hover:border-[#22375d]'
      }`}
    >
      {/* Top Header: Pillar & Recommendation */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center space-x-2">
          {getPillarBadge()}
          <span className="text-[11px] font-mono text-slate-500">{item.id}</span>
        </div>

        {/* Agent Recommendation Pill */}
        <div className="flex items-center space-x-1.5 rounded-full border border-amber-500/30 bg-amber-950/30 px-2.5 py-0.5 text-[11px] font-medium text-amber-300">
          <AlertCircle className="h-3 w-3" />
          <span>Agent recommendation: <strong>{item.recommendation}</strong></span>
        </div>
      </div>

      {/* Title */}
      <h3 className="mt-3 text-base font-semibold text-white">
        {item.title}
      </h3>

      {/* Escalation & Consequence details */}
      <div className="mt-3.5 space-y-2 rounded-xl border border-[#16233a] bg-[#08101e] p-3 text-xs">
        {/* Why it was escalated */}
        <div className="flex items-start space-x-2">
          <span className="text-[#6d7e95] shrink-0 font-medium">Why escalated:</span>
          <span className="text-slate-200 font-medium">{item.escalationReason}</span>
        </div>

        {/* If you wait */}
        <div className="flex items-start space-x-2 border-t border-[#131f34] pt-2">
          <span className="text-amber-400/90 shrink-0 font-medium">If you wait:</span>
          <span className="text-[#8e9eb3]">{item.consequenceIfWait}</span>
        </div>
      </div>

      {/* Inline Redirect form if clicked */}
      {showRedirectInput ? (
        <form onSubmit={handleRedirectSubmit} className="mt-4 flex items-center space-x-2">
          <input
            type="text"
            required
            autoFocus
            placeholder="Redirect to agent (e.g. @design-lead or @qa-bot)..."
            value={redirectTarget}
            onChange={(e) => setRedirectTarget(e.target.value)}
            className="flex-1 rounded-xl border border-[#1e2f4e] bg-[#081020] px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
          />
          <button
            type="submit"
            className="rounded-xl bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-blue-500 transition-colors"
          >
            Send
          </button>
          <button
            type="button"
            onClick={() => setShowRedirectInput(false)}
            className="rounded-xl border border-[#1e2f4e] px-2.5 py-1.5 text-xs text-slate-400 hover:text-white"
          >
            Cancel
          </button>
        </form>
      ) : (
        /* Action Buttons: Approve, Reject, Redirect */
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#15233c]">
          <button
            onClick={() => setShowRedirectInput(true)}
            className="flex items-center space-x-1.5 text-xs font-medium text-slate-400 hover:text-slate-200 transition-colors"
          >
            <Share2 className="h-3.5 w-3.5" />
            <span>Redirect</span>
          </button>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => handleAction('reject')}
              className="flex items-center space-x-1.5 rounded-xl border border-rose-900/50 bg-rose-950/20 px-3.5 py-1.5 text-xs font-medium text-rose-300 hover:bg-rose-900/40 hover:border-rose-700/60 transition-all"
            >
              <X className="h-3.5 w-3.5" />
              <span>Reject</span>
            </button>

            <button
              onClick={() => handleAction('approve')}
              className="flex items-center space-x-1.5 rounded-xl border border-blue-600/50 bg-blue-600 px-4 py-1.5 text-xs font-semibold text-white hover:bg-blue-500 transition-all shadow-md shadow-blue-600/20"
            >
              <Check className="h-3.5 w-3.5" />
              <span>Approve</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
