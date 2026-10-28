import React, { useState } from 'react';
import { ChevronUp, Eye, EyeOff } from 'lucide-react';
import { IssueItem } from '../types/dashboard';

interface IssuesTableProps {
  issues?: IssueItem[];
  onViewAll?: () => void;
  onSelectIssue?: (issue: IssueItem) => void;
}

export const IssuesTable: React.FC<IssuesTableProps> = ({
  issues = [],
  onViewAll,
  onSelectIssue,
}) => {
  // Demo mode toggle so the user can see both empty state (exact match) and sample populated state
  const [showDemoIssues, setShowDemoIssues] = useState(false);

  const demoIssuesList: IssueItem[] = [
    {
      id: 'ZIK-104',
      votes: 14,
      title: 'Optimize vector retrieval latency for agent tool calls',
      type: 'Performance',
      priority: 'High',
      status: 'In Progress',
      stage: 'Review',
      reported: '2d ago',
    },
    {
      id: 'ZIK-108',
      votes: 8,
      title: 'Dark mode contrast adjustments for high-DPI displays',
      type: 'UI/UX',
      priority: 'Medium',
      status: 'Open',
      stage: 'Backlog',
      reported: '4d ago',
    },
  ];

  const displayList = showDemoIssues ? demoIssuesList : issues;

  const getPriorityBadge = (priority: IssueItem['priority']) => {
    switch (priority) {
      case 'High':
        return 'text-rose-400 bg-rose-950/40 border border-rose-800/30';
      case 'Medium':
        return 'text-amber-400 bg-amber-950/40 border border-amber-800/30';
      case 'Low':
        return 'text-emerald-400 bg-emerald-950/40 border border-emerald-800/30';
    }
  };

  const getStatusBadge = (status: IssueItem['status']) => {
    switch (status) {
      case 'In Progress':
        return 'text-blue-400 bg-blue-950/40 border border-blue-800/30';
      case 'Resolved':
        return 'text-emerald-400 bg-emerald-950/40 border border-emerald-800/30';
      default:
        return 'text-slate-300 bg-slate-800/60 border border-slate-700/30';
    }
  };

  return (
    <div className="rounded-2xl border border-[#172338] bg-[#0c1527] overflow-hidden shadow-sm">
      {/* Table Header Section */}
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-baseline space-x-2.5">
          <h2 className="text-sm font-semibold tracking-wide text-white">
            Issues assigned to me
          </h2>
          <span className="text-xs text-[#708199]">
            {displayList.length} issues · sorted by top votes
          </span>
        </div>

        <div className="flex items-center space-x-2">
          {/* Subtle Demo Toggle for User Testing */}
          <button
            onClick={() => setShowDemoIssues(!showDemoIssues)}
            className="flex items-center space-x-1.5 rounded-lg border border-[#1c2c47] bg-[#101b30] px-2.5 py-1 text-[11px] font-medium text-slate-400 hover:text-slate-200 transition-colors"
            title="Toggle between Empty State and Sample Data"
          >
            {showDemoIssues ? (
              <>
                <EyeOff className="h-3 w-3" />
                <span>Show Empty State</span>
              </>
            ) : (
              <>
                <Eye className="h-3 w-3" />
                <span>Preview With Data</span>
              </>
            )}
          </button>

          {/* View All Issues Button */}
          <button
            onClick={onViewAll}
            className="rounded-lg border border-[#1a2b47] bg-[#0e182d] px-3.5 py-1.5 text-xs font-medium text-slate-300 hover:border-slate-500 hover:text-white transition-all shadow-sm"
          >
            View all issues
          </button>
        </div>
      </div>

      {/* Columns Header Bar */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-y border-[#152136] bg-[#0f192f] text-[11px] font-semibold tracking-wider text-[#64748b]">
              <th className="py-2.5 pl-6 pr-4 w-20">VOTES</th>
              <th className="py-2.5 px-4 min-w-[240px]">ISSUE</th>
              <th className="py-2.5 px-4 w-28">TYPE</th>
              <th className="py-2.5 px-4 w-28">PRIORITY</th>
              <th className="py-2.5 px-4 w-32">STATUS</th>
              <th className="py-2.5 px-4 w-28">STAGE</th>
              <th className="py-2.5 pr-6 pl-4 w-28 text-right">REPORTED</th>
            </tr>
          </thead>

          <tbody>
            {displayList.length === 0 ? (
              /* Exact Matching Empty State from Screenshot */
              <tr>
                <td colSpan={7} className="py-20 text-center">
                  <div className="flex flex-col items-center justify-center space-y-1">
                    <p className="text-sm font-semibold text-slate-200">
                      Nothing assigned to you
                    </p>
                    <p className="text-xs text-[#6e8097]">
                      Issues assigned to you will show up here.
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              /* Populated Issues List */
              displayList.map((issue) => (
                <tr
                  key={issue.id}
                  onClick={() => onSelectIssue?.(issue)}
                  className="border-b border-[#142036] hover:bg-[#111d35] cursor-pointer transition-colors text-xs"
                >
                  <td className="py-3.5 pl-6 pr-4 font-semibold text-slate-300">
                    <div className="flex items-center space-x-1">
                      <ChevronUp className="h-3.5 w-3.5 text-blue-400" />
                      <span>{issue.votes}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center space-x-2">
                      <span className="font-mono text-[11px] text-blue-400 font-semibold">
                        {issue.id}
                      </span>
                      <span className="font-medium text-slate-200 hover:text-white">
                        {issue.title}
                      </span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-[#8b9bb2]">{issue.type}</td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-flex px-2 py-0.5 rounded text-[10px] font-semibold ${getPriorityBadge(
                        issue.priority
                      )}`}
                    >
                      {issue.priority}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-flex px-2 py-0.5 rounded text-[10px] font-semibold ${getStatusBadge(
                        issue.status
                      )}`}
                    >
                      {issue.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-[#8b9bb2]">{issue.stage}</td>
                  <td className="py-3.5 pr-6 pl-4 text-right text-[#6e8097]">
                    {issue.reported}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Footer Info Row */}
      <div className="border-t border-[#142036] px-6 py-3">
        <span className="text-xs text-[#52637a]">
          Showing {displayList.length} issues
        </span>
      </div>
    </div>
  );
};
