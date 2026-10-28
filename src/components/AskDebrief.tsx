import React, { useState } from 'react';
import { Search, Sparkles, ArrowRight, CornerDownLeft, Bot, ExternalLink } from 'lucide-react';
import { DebriefQueryAnswer } from '../types/dashboard';

interface AskDebriefProps {
  onSelectItem: (drillDownId: string) => void;
  onOpenRule: () => void;
}

export const AskDebrief: React.FC<AskDebriefProps> = ({
  onSelectItem,
  onOpenRule,
}) => {
  const [query, setQuery] = useState('');
  const [activeAnswer, setActiveAnswer] = useState<DebriefQueryAnswer | null>(null);

  const predefinedAnswers: Record<string, DebriefQueryAnswer> = {
    'Why was the checkout fix blocked?': {
      question: 'Why was the checkout fix blocked?',
      answer:
        'The checkout fix (PR #479) was blocked because the Payments Agent detected an unhandled Stripe webhook idempotency race condition. Two consensus reviewers flagged potential duplicate charge risks during burst traffic. The issue was returned to triage with reproduction traces.',
      relatedItemId: 'dd-minor-2',
      relatedItemTitle: 'Inspect Checkout Incident PR #479',
    },
    'What did the agents learn this week?': {
      question: 'What did the agents learn this week?',
      answer:
        'Following an unexpected +400ms latency spike in channel filtering, the agents codified Rule 42 in agents.md requiring mandatory synthetic load tests for any message query modifications. No further query regressions have occurred since enforcement.',
      relatedItemId: 'rule-42',
      relatedItemTitle: 'View Learned Rule #42 in agents.md',
    },
    'Which changes touched billing?': {
      question: 'Which changes touched billing?',
      answer:
        'Two changes touched billing: PR #471 added rate limiting to subscription checkout endpoints (Security), and PR #468 updated tax calculations for EU customers (Product). Both passed full automated integration suites before production rollout.',
      relatedItemId: 'dd-login-rate-limit',
      relatedItemTitle: 'View Billing Rate Limiting (PR #471)',
    },
  };

  const sampleQuestions = [
    'Why was the checkout fix blocked?',
    'What did the agents learn this week?',
    'Which changes touched billing?',
  ];

  const handleSelectQuestion = (q: string) => {
    setQuery(q);
    setActiveAnswer(predefinedAnswers[q]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    // Check if query matches or contains any known keyword
    const lower = query.toLowerCase();
    if (lower.includes('checkout') || lower.includes('blocked')) {
      handleSelectQuestion('Why was the checkout fix blocked?');
    } else if (lower.includes('learn') || lower.includes('rule')) {
      handleSelectQuestion('What did the agents learn this week?');
    } else if (lower.includes('billing') || lower.includes('stripe') || lower.includes('payment')) {
      handleSelectQuestion('Which changes touched billing?');
    } else {
      // General debrief response for any custom question
      setActiveAnswer({
        question: query,
        answer: `Over the past 14 hours, 15 autonomous PRs were evaluated with 14 merged and 1 safely rolled back. No critical security breaches or downtime occurred, and 2 decision items await your executive review above.`,
        relatedItemId: 'dd-floating-menu',
        relatedItemTitle: 'View Top Autonomous Merge (PR #482)',
      });
    }
  };

  const handleLinkClick = (relatedId?: string) => {
    if (!relatedId) return;
    if (relatedId === 'rule-42') {
      onOpenRule();
    } else {
      onSelectItem(relatedId);
    }
  };

  return (
    <div className="rounded-2xl border border-[#172338] bg-[#0c1527] p-5 shadow-sm">
      {/* Header */}
      <div className="flex items-center space-x-2 pb-3 border-b border-[#152136]">
        <Sparkles className="h-4 w-4 text-blue-400" />
        <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-300">
          ASK THE DEBRIEF
        </h2>
        <span className="text-[11px] text-[#6d7e95]">
          Query autonomous agent actions and reasoning
        </span>
      </div>

      {/* Search Input Box */}
      <form onSubmit={handleSubmit} className="mt-3 relative">
        <div className="relative flex items-center">
          <Search className="absolute left-3.5 h-4 w-4 text-slate-500" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask about anything that happened..."
            className="w-full rounded-xl border border-[#1a2c49] bg-[#08101f] py-2.5 pl-10 pr-10 text-xs text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all"
          />
          <button
            type="submit"
            className="absolute right-2 rounded-lg bg-[#142340] p-1.5 text-slate-400 hover:text-white transition-colors"
            title="Submit query"
          >
            <CornerDownLeft className="h-3.5 w-3.5" />
          </button>
        </div>
      </form>

      {/* 3 Clickable Sample Questions */}
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span className="text-[11px] text-[#607187]">Suggested:</span>
        {sampleQuestions.map((q) => (
          <button
            key={q}
            type="button"
            onClick={() => handleSelectQuestion(q)}
            className={`rounded-lg border px-2.5 py-1 text-[11px] transition-colors text-left ${
              activeAnswer?.question === q
                ? 'border-blue-500/50 bg-blue-950/40 text-blue-300'
                : 'border-[#18263f] bg-[#091122] text-slate-400 hover:border-slate-600 hover:text-slate-200'
            }`}
          >
            &ldquo;{q}&rdquo;
          </button>
        ))}
      </div>

      {/* Answer Output Card */}
      {activeAnswer && (
        <div className="mt-4 rounded-xl border border-[#1e2f4e] bg-[#091224] p-4 text-xs animate-fade-in space-y-2.5">
          <div className="flex items-center space-x-2 text-blue-400 font-semibold text-[11px]">
            <Bot className="h-3.5 w-3.5" />
            <span>Debrief Agent Response</span>
          </div>

          <p className="text-slate-200 leading-relaxed">
            {activeAnswer.answer}
          </p>

          {activeAnswer.relatedItemId && (
            <div className="pt-2 border-t border-[#15233c]">
              <button
                onClick={() => handleLinkClick(activeAnswer.relatedItemId)}
                className="inline-flex items-center space-x-1.5 text-xs font-semibold text-blue-400 hover:text-blue-300 hover:underline"
              >
                <span>{activeAnswer.relatedItemTitle}</span>
                <ExternalLink className="h-3 w-3" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
