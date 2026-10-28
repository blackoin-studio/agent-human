import { DrillDownData } from '../types/dashboard';

export const mockDrillDownData: Record<string, DrillDownData> = {
  'dd-floating-menu': {
    id: 'dd-floating-menu',
    title: 'Fixed floating menu overlapping messages on mobile',
    pillar: 'Product',
    status: 'Live',
    summary:
      'A CSS z-index stacking issue caused the floating reaction toolbar to cover chat inputs on viewport widths under 480px. Fixed by isolating the drawer stacking context with CSS contain: paint.',
    agentsInvolved: [
      { name: 'MobileUI-Agent', role: 'Author', vote: 'approve' },
      { name: 'VisualRegression-Bot', role: 'Reviewer', vote: 'approve' },
      { name: 'Accessibility-Bot', role: 'Reviewer', vote: 'approve' },
      { name: 'ConsensusOrchestrator', role: 'Consensus', vote: 'approve' },
    ],
    consensusResult: 'Consensus passed: 4 of 4 approved',
    prNumber: 'PR #482',
    timeline: [
      {
        title: 'Issue created',
        subtitle: 'Telemetry flagged 28 user touch cancels on mobile drawer',
        timestamp: '1:45 AM',
        status: 'completed',
        details: 'Issue #ZIK-891 labeled mobile-viewport',
      },
      {
        title: 'Agents involved',
        subtitle: 'MobileUI-Agent claimed issue & assigned test runner',
        timestamp: '1:50 AM',
        status: 'completed',
      },
      {
        title: 'Consensus result',
        subtitle: 'All 4 evaluating agents confirmed fix without regressions',
        timestamp: '2:30 AM',
        status: 'completed',
        details: 'Chromium headless mobile tests: 42/42 passed',
      },
      {
        title: 'PR opened',
        subtitle: 'Created PR #482 (2 files changed, +14 / -4 lines)',
        timestamp: '2:35 AM',
        status: 'completed',
      },
      {
        title: 'Merged',
        subtitle: 'Automated squash & fast-forward merge into main',
        timestamp: '2:55 AM',
        status: 'completed',
      },
      {
        title: 'Live in production',
        subtitle: 'Deployed via Canary cluster (v2.14.8)',
        timestamp: '3:12 AM',
        status: 'completed',
      },
      {
        title: 'Post-deploy check passed',
        subtitle: 'Synthetic touch latency p95: 14ms (well below 50ms target)',
        timestamp: '3:20 AM',
        status: 'completed',
      },
    ],
  },

  'dd-pricing-typo': {
    id: 'dd-pricing-typo',
    title: 'Corrected pricing page headline typo',
    pillar: 'Marketing',
    status: 'Live',
    summary:
      'Fixed misspelling of "Enterprise-grade" on the public tier comparison page. Verified SEO meta tags remained intact.',
    agentsInvolved: [
      { name: 'Copywriter-Agent', role: 'Author', vote: 'approve' },
      { name: 'SEO-Validator', role: 'Reviewer', vote: 'approve' },
      { name: 'BrandConsistency-Bot', role: 'Reviewer', vote: 'approve' },
    ],
    consensusResult: 'Consensus passed: 3 of 3 approved',
    prNumber: 'PR #486',
    timeline: [
      {
        title: 'Issue created',
        subtitle: 'Automated spellcheck runner detected anomaly in marketing bundle',
        timestamp: '6:10 AM',
        status: 'completed',
      },
      {
        title: 'Agents involved',
        subtitle: 'Copywriter-Agent and SEO-Validator inspected strings',
        timestamp: '6:15 AM',
        status: 'completed',
      },
      {
        title: 'Consensus result',
        subtitle: 'Zero diff in schema markup or canonical URLs',
        timestamp: '6:25 AM',
        status: 'completed',
      },
      {
        title: 'PR opened',
        subtitle: 'PR #486 (1 file changed, +1 / -1 lines)',
        timestamp: '6:30 AM',
        status: 'completed',
      },
      {
        title: 'Merged',
        subtitle: 'Clean merge to main by AutoDeploy bot',
        timestamp: '6:35 AM',
        status: 'completed',
      },
      {
        title: 'Live in production',
        subtitle: 'CloudFront Edge CDN invalidation cleared',
        timestamp: '6:40 AM',
        status: 'completed',
      },
      {
        title: 'Post-deploy check passed',
        subtitle: 'HTTP 200 verification across 12 global edge regions',
        timestamp: '6:45 AM',
        status: 'completed',
      },
    ],
  },

  'dd-login-rate-limit': {
    id: 'dd-login-rate-limit',
    title: 'Added rate limiting to the login endpoint',
    pillar: 'Security',
    status: 'Live',
    summary:
      'Implemented sliding-window Redis rate limiter allowing up to 10 failed password attempts per IP per 5 minutes, mitigating credential-stuffing bursts.',
    agentsInvolved: [
      { name: 'SecurityHardener', role: 'Author', vote: 'approve' },
      { name: 'RedTeam-Simulator', role: 'Reviewer', vote: 'approve' },
      { name: 'AuthGuardian', role: 'Reviewer', vote: 'approve' },
    ],
    consensusResult: 'Consensus passed: 3 of 3 approved',
    prNumber: 'PR #490',
    timeline: [
      {
        title: 'Issue created',
        subtitle: 'Threat sensor noted 4x increase in distributed failed auth probes',
        timestamp: '8:15 AM',
        status: 'completed',
      },
      {
        title: 'Agents involved',
        subtitle: 'SecurityHardener drafted sliding-window algorithm',
        timestamp: '8:25 AM',
        status: 'completed',
      },
      {
        title: 'Consensus result',
        subtitle: 'RedTeam-Simulator verified legitimate SSO traffic was unharmed',
        timestamp: '8:45 AM',
        status: 'completed',
      },
      {
        title: 'PR opened',
        subtitle: 'PR #490 (4 files changed, +82 / -12 lines)',
        timestamp: '8:50 AM',
        status: 'completed',
      },
      {
        title: 'Merged',
        subtitle: 'Merged with mandatory dual-cryptographic sign-off',
        timestamp: '8:58 AM',
        status: 'completed',
      },
      {
        title: 'Live in production',
        subtitle: 'Rolled out across all auth cluster pods',
        timestamp: '9:05 AM',
        status: 'completed',
      },
      {
        title: 'Post-deploy check passed',
        subtitle: 'Blocked 1,240 brute-force payloads within first 15 minutes',
        timestamp: '9:20 AM',
        status: 'completed',
      },
    ],
  },

  'dd-rollback-search': {
    id: 'dd-rollback-search',
    title: 'Rolled back: search filter change slowed channel loading (+400ms)',
    pillar: 'Product',
    status: 'Rolled Back',
    summary:
      'PR #491 attempted to add a regex fuzzy search index to message channels. In production, unindexed table scans caused channel initial loading to degrade by +400ms. An automated rollback was executed 120 seconds post-deploy.',
    agentsInvolved: [
      { name: 'SearchQuery-Bot', role: 'Author', vote: 'approve' },
      { name: 'Consensus-Bot', role: 'Reviewer', vote: 'approve' },
      { name: 'SRE-Watchdog', role: 'Monitor', vote: 'reject' },
    ],
    consensusResult: 'SRE-Watchdog initiated autonomous circuit-breaker rollback',
    prNumber: 'PR #491',
    timeline: [
      {
        title: 'Issue created',
        subtitle: 'Feature request for substring search across archive history',
        timestamp: '3:30 AM',
        status: 'completed',
      },
      {
        title: 'Agents involved',
        subtitle: 'SearchQuery-Bot generated PostgreSQL trigram index changes',
        timestamp: '3:45 AM',
        status: 'completed',
      },
      {
        title: 'Consensus result',
        subtitle: 'Passed unit tests in isolation on dev replica',
        timestamp: '4:00 AM',
        status: 'warning',
      },
      {
        title: 'PR opened',
        subtitle: 'PR #491 merged into production branch',
        timestamp: '4:05 AM',
        status: 'completed',
      },
      {
        title: 'Live in production',
        subtitle: 'Deployed to production cluster',
        timestamp: '4:10 AM',
        status: 'completed',
      },
      {
        title: 'Post-deploy check FAILED',
        subtitle: 'Channel load latency surged from 42ms to 442ms (+400ms anomaly)',
        timestamp: '4:12 AM',
        status: 'failed',
        details: 'SRE trigger: latency_p95 > 200ms threshold breached',
      },
      {
        title: 'Autonomous rollback executed',
        subtitle: 'Reverted to previous healthy image in 8 seconds. Issue reopened.',
        timestamp: '4:14 AM',
        status: 'completed',
        details: 'agents.md Rule #42 created to prevent future query merges without load tests',
      },
    ],
  },

  'dd-minor-1': {
    id: 'dd-minor-1',
    title: 'Aligned avatar spacing in reaction row',
    pillar: 'Product',
    status: 'Live',
    summary: 'Adjusted CSS negative margin overlap on reaction avatar stacks from -6px to -4px.',
    agentsInvolved: [{ name: 'CSS-Agent', role: 'Author', vote: 'approve' }],
    consensusResult: 'Consensus passed: 2 of 2 approved',
    prNumber: 'PR #475',
    timeline: [
      { title: 'Issue created', subtitle: 'Design lint warning', timestamp: '2:00 AM', status: 'completed' },
      { title: 'Merged & Live', subtitle: 'Pushed to production', timestamp: '2:15 AM', status: 'completed' },
      { title: 'Post-deploy check passed', subtitle: 'Zero visual regressions', timestamp: '2:20 AM', status: 'completed' },
    ],
  },
};
