import React, { useState } from 'react';
import {
  Clock,
  Sparkles,
  CheckCircle2,
  Calendar,
  ChevronDown,
  Layers,
  Shield,
  Bot
} from 'lucide-react';
import { Navbar } from './components/Navbar';
import { NeedsYouCard } from './components/NeedsYouCard';
import { ShippedSection } from './components/ShippedSection';
import { WentWrongSection } from './components/WentWrongSection';
import { AgentsLearnedSection } from './components/AgentsLearnedSection';
import { InFlightPulse } from './components/InFlightPulse';
import { AskDebrief } from './components/AskDebrief';
import { DrillDownPanel } from './components/DrillDownPanel';
import { RuleModal } from './components/RuleModal';
import { PlaceholderPage } from './components/PlaceholderPage';
import { NavTab, TimeWindow, NeedsYouItem, DrillDownData } from './types/dashboard';
import { mockDrillDownData } from './data/mockDebrief';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<NavTab>('dashboard');
  const [timeWindow, setTimeWindow] = useState<TimeWindow>('since_last_visit');
  const [isTimeDropdownOpen, setIsTimeDropdownOpen] = useState(false);
  const [isDemoEmptyState, setIsDemoEmptyState] = useState(false);

  // Drill-down panel state
  const [selectedDrillDownId, setSelectedDrillDownId] = useState<string | null>(null);
  const [isRuleModalOpen, setIsRuleModalOpen] = useState(false);

  // Decision items that need the human manager
  const initialNeedsYou: NeedsYouItem[] = [
    {
      id: 'DEC-201',
      title: 'Redesign onboarding flow',
      pillar: 'Product',
      recommendation: 'Reject',
      recommendationNote: 'Large diff and unverified visual changes',
      escalationReason: 'Low agent consensus: 2 of 5 approved. Large diff (41 files) and visual redesign.',
      consequenceIfWait: 'Stays unmerged, zero user impact.',
      diffSummary: '+1,480 / -920 lines across 41 files',
      agentConsensus: '2/5 approved',
    },
    {
      id: 'DEC-202',
      title: 'Change primary button color to green',
      pillar: 'Marketing',
      recommendation: 'Escalate to team',
      recommendationNote: 'Brand color modification requires executive sign-off',
      escalationReason: 'Brand decision: modifies the core design system primary token across all client apps.',
      consequenceIfWait: 'Stays unmerged.',
      diffSummary: '+3 / -3 lines in tokens.css',
      agentConsensus: 'Automated consensus withheld for brand token changes',
    },
  ];

  const [needsYouItems, setNeedsYouItems] = useState<NeedsYouItem[]>(initialNeedsYou);

  // Handler functions for decisions
  const handleApprove = (id: string) => {
    setNeedsYouItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleReject = (id: string) => {
    setNeedsYouItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleRedirect = (id: string, target: string) => {
    setNeedsYouItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleOpenDrillDown = (drillDownId: string) => {
    setSelectedDrillDownId(drillDownId);
  };

  const activeDrillDownData: DrillDownData | null = selectedDrillDownId
    ? mockDrillDownData[selectedDrillDownId] || mockDrillDownData['dd-floating-menu']
    : null;

  // Decide whether to show Needs You cards
  const showNeedsYou = !isDemoEmptyState && needsYouItems.length > 0;

  const timeWindowLabels: Record<TimeWindow, string> = {
    since_last_visit: 'Since last visit (14h ago)',
    today: 'Today (Past 24 hours)',
    this_week: 'This week',
    custom: 'Custom range',
  };

  return (
    <div className="min-h-screen bg-[#060b17] text-white selection:bg-blue-600 selection:text-white">
      {/* Top Navbar matching original UI */}
      <Navbar
        activeTab={activeTab}
        onTabChange={(tab) => setActiveTab(tab)}
        points={7247}
      />

      {/* Main Container */}
      <main>
        {activeTab === 'dashboard' ? (
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8 space-y-6">
            
            {/* 1. Header Section: Greeting + 14h Debrief + Time Window Selector + Points Subtitle */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between pb-2 border-b border-[#142036]">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                  Welcome back, Uriel. Since you left, 14 hours ago.
                </h1>
                
                {/* Points Subtitle (Requirement 10) */}
                <div className="mt-1.5 flex items-center space-x-2 text-xs text-[#7e8fa6]">
                  <span className="inline-flex items-center space-x-1 text-emerald-400 font-medium">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    <span>3 of your issues shipped this week.</span>
                  </span>
                  <span>·</span>
                  <span>14 autonomous PRs processed while you were away.</span>
                </div>
              </div>

              {/* Time Window Selector & Demo Empty State Toggle */}
              <div className="flex flex-wrap items-center gap-2.5 self-start sm:self-auto shrink-0">
                {/* Demo: Empty State Toggle (Requirement 7) */}
                <button
                  onClick={() => setIsDemoEmptyState(!isDemoEmptyState)}
                  className={`flex items-center space-x-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-medium transition-all ${
                    isDemoEmptyState
                      ? 'border-emerald-500/40 bg-[#06382b] text-[#34d399]'
                      : 'border-[#1b2b48] bg-[#0c162a] text-slate-400 hover:text-slate-200'
                  }`}
                  title="Toggle between items needing you and all-clear empty state"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-current" />
                  <span>Demo: empty state</span>
                </button>

                {/* Time Window Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setIsTimeDropdownOpen(!isTimeDropdownOpen)}
                    className="flex items-center space-x-2 rounded-lg border border-[#1b2b48] bg-[#0c162a] px-3 py-1.5 text-xs font-medium text-slate-200 hover:border-slate-500 hover:text-white transition-all shadow-sm"
                  >
                    <Calendar className="h-3.5 w-3.5 text-blue-400" />
                    <span>{timeWindowLabels[timeWindow]}</span>
                    <ChevronDown
                      className={`h-3 w-3 text-slate-400 transition-transform ${
                        isTimeDropdownOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {isTimeDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 rounded-xl border border-[#1e2f4e] bg-[#0c1527] p-1.5 shadow-2xl z-50">
                      {(['since_last_visit', 'today', 'this_week', 'custom'] as TimeWindow[]).map(
                        (win) => (
                          <button
                            key={win}
                            onClick={() => {
                              setTimeWindow(win);
                              setIsTimeDropdownOpen(false);
                            }}
                            className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-xs text-left transition-colors ${
                              timeWindow === win
                                ? 'bg-blue-600/20 text-blue-400 font-medium'
                                : 'text-slate-300 hover:bg-[#15233e] hover:text-white'
                            }`}
                          >
                            <span>{timeWindowLabels[win]}</span>
                            {timeWindow === win && (
                              <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                            )}
                          </button>
                        )
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* 6. IN FLIGHT Pulse Line (Requirement 6) */}
            <InFlightPulse
              inProgressCount={6}
              waitingChecksCount={2}
            />

            {/* 2 & 7. NEEDS YOU Section (Decision Cards or All-Clear State) */}
            <section className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 rounded-full bg-amber-400" />
                  <h2 className="text-xs font-semibold uppercase tracking-wider text-amber-300">
                    NEEDS YOU
                  </h2>
                  <span className="text-[11px] text-[#6d7e95]">
                    Decisions blocked on executive judgment
                  </span>
                </div>

                {showNeedsYou && (
                  <span className="rounded-full bg-amber-950/60 border border-amber-800/40 px-2 py-0.5 text-[11px] font-bold text-amber-300">
                    {needsYouItems.length}
                  </span>
                )}
              </div>

              {showNeedsYou ? (
                /* 2 Decision Cards */
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {needsYouItems.map((item) => (
                    <NeedsYouCard
                      key={item.id}
                      item={item}
                      onApprove={handleApprove}
                      onReject={handleReject}
                      onRedirect={handleRedirect}
                    />
                  ))}
                </div>
              ) : (
                /* 7. ALL CLEAR State (Requirement 7) */
                <div className="rounded-2xl border border-[#16233a] bg-[#0c1527] p-8 text-center shadow-sm">
                  <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-emerald-950/60 text-emerald-400 border border-emerald-800/30">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <h3 className="mt-3 text-sm font-semibold text-white">
                    Nothing needs you. All clear.
                  </h3>
                  <p className="mt-1 text-xs text-[#708197] max-w-sm mx-auto">
                    Agents are operating within consensus guidelines. All blocked decisions have been cleared.
                  </p>
                  {isDemoEmptyState && (
                    <button
                      onClick={() => {
                        setIsDemoEmptyState(false);
                        setNeedsYouItems(initialNeedsYou);
                      }}
                      className="mt-4 text-xs font-medium text-blue-400 hover:underline"
                    >
                      Reset decision cards
                    </button>
                  )}
                </div>
              )}
            </section>

            {/* 3. SHIPPED Section (Requirement 3) */}
            <section>
              <ShippedSection onSelectItem={handleOpenDrillDown} />
            </section>

            {/* 4. WENT WRONG Section (Requirement 4) */}
            <section>
              <WentWrongSection onSelectItem={handleOpenDrillDown} />
            </section>

            {/* 5. WHAT THE AGENTS LEARNED (Requirement 5) */}
            <section>
              <AgentsLearnedSection />
            </section>

            {/* 8. ASK THE DEBRIEF (Requirement 8) */}
            <section>
              <AskDebrief
                onSelectItem={handleOpenDrillDown}
                onOpenRule={() => setIsRuleModalOpen(true)}
              />
            </section>

          </div>
        ) : (
          <PlaceholderPage
            tab={activeTab}
            onBackToDashboard={() => setActiveTab('dashboard')}
          />
        )}
      </main>

      {/* 9. DRILL-DOWN Side Panel (Requirement 9) */}
      <DrillDownPanel
        data={activeDrillDownData}
        onClose={() => setSelectedDrillDownId(null)}
      />

      {/* Rule Inspection Modal */}
      <RuleModal
        isOpen={isRuleModalOpen}
        onClose={() => setIsRuleModalOpen(false)}
      />
    </div>
  );
};

export default App;
