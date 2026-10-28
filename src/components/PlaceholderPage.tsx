import React from 'react';
import { Layers, Megaphone, Shield, Bot, ArrowLeft } from 'lucide-react';
import { NavTab } from '../types/dashboard';

interface PlaceholderPageProps {
  tab: NavTab;
  onBackToDashboard: () => void;
}

export const PlaceholderPage: React.FC<PlaceholderPageProps> = ({
  tab,
  onBackToDashboard,
}) => {
  const getTabConfig = () => {
    switch (tab) {
      case 'product':
        return {
          title: 'Product Roadmap & Backlog',
          subtitle: 'Plan features, manage user stories, and track deliverables.',
          icon: Layers,
          color: 'text-indigo-400 bg-indigo-950/40 border-indigo-800/30',
        };
      case 'marketing':
        return {
          title: 'Marketing Campaigns',
          subtitle: 'Manage launches, content calendars, and growth telemetry.',
          icon: Megaphone,
          color: 'text-pink-400 bg-pink-950/40 border-pink-800/30',
        };
      case 'security':
        return {
          title: 'Security & Compliance',
          subtitle: 'Audit logs, identity governance, and vulnerability scans.',
          icon: Shield,
          color: 'text-emerald-400 bg-emerald-950/40 border-emerald-800/30',
        };
      case 'agents':
        return {
          title: 'AI Agents & Automation',
          subtitle: 'Configure autonomous agents, tool invocations, and review bots.',
          icon: Bot,
          color: 'text-blue-400 bg-blue-950/40 border-blue-800/30',
        };
      default:
        return {
          title: 'Workspace Section',
          subtitle: 'This module is ready for your team.',
          icon: Layers,
          color: 'text-slate-400 bg-slate-800/40 border-slate-700/30',
        };
    }
  };

  const config = getTabConfig();
  const IconComponent = config.icon;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
      <div className="rounded-3xl border border-[#172338] bg-[#0c1527] p-12 text-center shadow-xl">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 shadow-lg">
          <IconComponent className="h-8 w-8 text-blue-400" />
        </div>

        <h1 className="mt-6 text-2xl font-bold tracking-tight text-white">
          {config.title}
        </h1>
        <p className="mt-2 text-sm text-[#7e8fa6] max-w-md mx-auto">
          {config.subtitle}
        </p>

        <div className="mt-8">
          <button
            onClick={onBackToDashboard}
            className="inline-flex items-center space-x-2 rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-semibold text-white hover:bg-blue-500 transition-colors shadow-lg shadow-blue-600/30"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Return to Dashboard</span>
          </button>
        </div>
      </div>
    </div>
  );
};
