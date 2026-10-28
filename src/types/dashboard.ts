export type NavTab = 'dashboard' | 'product' | 'marketing' | 'security' | 'agents';

export type TimeWindow = 'since_last_visit' | 'today' | 'this_week' | 'custom';

export type TimeframeGranularity = 'daily' | 'weekly' | 'monthly' | 'yearly';

export type Pillar = 'Product' | 'Marketing' | 'Security';

export interface StatItem {
  id: string;
  title: string;
  value: string | number;
  badgeText: string;
  badgeType: 'blue' | 'green' | 'slate';
  subtext: string;
  href?: string;
}

export interface IssueItem {
  id: string;
  votes: number;
  title: string;
  type: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Open' | 'In Progress' | 'Resolved' | 'Closed';
  stage: string;
  reported: string;
}

export interface NeedsYouItem {
  id: string;
  title: string;
  pillar: Pillar;
  recommendation: 'Reject' | 'Approve' | 'Escalate to team';
  recommendationNote: string;
  escalationReason: string;
  consequenceIfWait: string;
  diffSummary?: string;
  agentConsensus?: string;
}

export interface ShippedItem {
  id: string;
  pillar: Pillar;
  outcome: string;
  time: string;
  isMinor?: boolean;
  drillDownId: string;
}

export interface WentWrongItem {
  id: string;
  title: string;
  description: string;
  status: 'Handled' | 'Investigating' | 'Resolved';
  impact: string;
  drillDownId: string;
}

export interface TimelineStep {
  title: string;
  subtitle: string;
  timestamp: string;
  status: 'completed' | 'failed' | 'warning' | 'current';
  details?: string;
}

export interface DrillDownData {
  id: string;
  title: string;
  pillar: Pillar;
  status: 'Live' | 'Rolled Back' | 'In Review';
  summary: string;
  agentsInvolved: { name: string; role: string; vote: 'approve' | 'reject' | 'abstain' }[];
  consensusResult: string;
  prNumber: string;
  timeline: TimelineStep[];
}

export interface DebriefQueryAnswer {
  question: string;
  answer: string;
  relatedItemId?: string;
  relatedItemTitle?: string;
}
