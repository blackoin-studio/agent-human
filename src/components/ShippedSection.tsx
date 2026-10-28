import React, { useState } from 'react';
import {
  ChevronDown,
  Layers,
  Megaphone,
  Shield,
  ArrowRight,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { ShippedItem, Pillar } from '../types/dashboard';

interface ShippedSectionProps {
  onSelectItem: (drillDownId: string) => void;
}

export const ShippedSection: React.FC<ShippedSectionProps> = ({ onSelectItem }) => {
  const [isMinorExpanded, setIsMinorExpanded] = useState(false);

  // Grouped live outcomes
  const primaryShipped: ShippedItem[] = [
    {
      id: 'shipped-1',
      pillar: 'Product',
      outcome: 'Fixed floating menu overlapping messages on mobile',
      time: '3:12 AM',
      drillDownId: 'dd-floating-menu',
    },
    {
      id: 'shipped-2',
      pillar: 'Marketing',
      outcome: 'Corrected pricing page headline typo',
      time: '6:40 AM',
      drillDownId: 'dd-pricing-typo',
    },
    {
      id: 'shipped-3',
      pillar: 'Security',
      outcome: 'Added rate limiting to the login endpoint',
      time: '9:05 AM',
      drillDownId: 'dd-login-rate-limit',
    },
  ];

  const minorFixes: ShippedItem[] = [
    {
      id: 'minor-1',
      pillar: 'Product',
      outcome: 'Aligned avatar spacing in reaction row',
      time: '2:15 AM',
      drillDownId: 'dd-minor-1',
    },
    {
      id: 'minor-2',
      pillar: 'Security',
      outcome: 'Rotated internal JWT signing keys per weekly schedule',
      time: '4:00 AM',
      drillDownId: 'dd-minor-2',
    },
    {
      id: 'minor-3',
      pillar: 'Marketing',
      outcome: 'Updated UTM tag parser for inbound referral tracking',
      time: '5:20 AM',
      drillDownId: 'dd-minor-3',
    },
    {
      id: 'minor-4',
      pillar: 'Product',
      outcome: 'Cached workspace emoji picker assets for offline support',
      time: '6:10 AM',
      drillDownId: 'dd-minor-4',
    },
    {
      id: 'minor-5',
      pillar: 'Product',
      outcome: 'Prevented duplicate submit event on enter key press',
      time: '7:00 AM',
      drillDownId: 'dd-minor-5',
    },
    {
      id: 'minor-6',
      pillar: 'Product',
      outcome: 'Normalized timestamp format across all notification cards',
      time: '7:45 AM',
      drillDownId: 'dd-minor-6',
    },
    {
      id: 'minor-7',
      pillar: 'Security',
      outcome: 'Restricted cross-origin resource sharing headers on /api/v1/metrics',
      time: '8:12 AM',
      drillDownId: 'dd-minor-7',
    },
    {
      id: 'minor-8',
      pillar: 'Marketing',
      outcome: 'Corrected meta viewport tag on public blog templates',
      time: '8:30 AM',
      drillDownId: 'dd-minor-8',
    },
    {
      id: 'minor-9',
      pillar: 'Product',
      outcome: 'Optimized thread collapse animation performance',
      time: '8:50 AM',
      drillDownId: 'dd-minor-9',
    },
    {
      id: 'minor-10',
      pillar: 'Security',
      outcome: 'Sanitized SVG upload preview markup',
      time: '9:30 AM',
      drillDownId: 'dd-minor-10',
    },
    {
      id: 'minor-11',
      pillar: 'Marketing',
      outcome: 'Fixed broken documentation link in footer navigation',
      time: '10:15 AM',
      drillDownId: 'dd-minor-11',
    },
    {
      id: 'minor-12',
      pillar: 'Product',
      outcome: 'Added keyboard shortcut (Cmd+K) hint tooltip on desktop',
      time: '11:00 AM',
      drillDownId: 'dd-minor-12',
    },
  ];

  const getPillarBadge = (pillar: Pillar) => {
    switch (pillar) {
      case 'Product':
        return (
          <span className="flex items-center space-x-1.5 w-24 text-[11px] font-medium text-blue-400">
            <Layers className="h-3.5 w-3.5 shrink-0" />
            <span>Product</span>
          </span>
        );
      case 'Marketing':
        return (
          <span className="flex items-center space-x-1.5 w-24 text-[11px] font-medium text-pink-400">
            <Megaphone className="h-3.5 w-3.5 shrink-0" />
            <span>Marketing</span>
          </span>
        );
      case 'Security':
        return (
          <span className="flex items-center space-x-1.5 w-24 text-[11px] font-medium text-emerald-400">
            <Shield className="h-3.5 w-3.5 shrink-0" />
            <span>Security</span>
          </span>
        );
    }
  };

  return (
    <div className="rounded-2xl border border-[#172338] bg-[#0c1527] p-5 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#152136]">
        <div className="flex items-center space-x-2">
          <div className="h-2 w-2 rounded-full bg-emerald-400" />
          <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-300">
            SHIPPED
          </h2>
          <span className="text-[11px] text-[#6d7e95]">
            Changes that went live autonomously
          </span>
        </div>
        <span className="text-[11px] font-medium text-slate-400">
          3 primary · 12 minor
        </span>
      </div>

      {/* Primary Items List */}
      <div className="divide-y divide-[#131f34]">
        {primaryShipped.map((item) => (
          <div
            key={item.id}
            onClick={() => onSelectItem(item.drillDownId)}
            className="group flex flex-col sm:flex-row sm:items-center justify-between py-3 px-2 rounded-xl hover:bg-[#0f192f] cursor-pointer transition-colors"
          >
            <div className="flex items-center space-x-3">
              {getPillarBadge(item.pillar)}
              <span className="text-xs font-medium text-slate-200 group-hover:text-white transition-colors">
                {item.outcome}
              </span>
            </div>

            <div className="flex items-center space-x-3 mt-1 sm:mt-0 pl-7 sm:pl-0">
              <span className="text-[11px] font-mono text-[#6c7f99]">
                {item.time}
              </span>
              <ArrowRight className="h-3 w-3 text-slate-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
            </div>
          </div>
        ))}
      </div>

      {/* Collapsible 12 Minor Fixes Row */}
      <div className="mt-2 pt-2 border-t border-[#131f34]">
        <button
          onClick={() => setIsMinorExpanded(!isMinorExpanded)}
          className="w-full flex items-center justify-between py-2 px-2 rounded-xl hover:bg-[#0e182d] text-xs font-medium text-slate-400 hover:text-slate-200 transition-colors"
        >
          <div className="flex items-center space-x-2">
            <Sparkles className="h-3.5 w-3.5 text-blue-400" />
            <span>
              {isMinorExpanded ? 'Hide minor fixes' : '12 minor fixes'}
            </span>
            <span className="text-[10px] text-slate-500">
              (lint, css polish, scheduled key rotations)
            </span>
          </div>

          <ChevronDown
            className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${
              isMinorExpanded ? 'rotate-180' : ''
            }`}
          />
        </button>

        {/* Expanded Minor Fixes */}
        {isMinorExpanded && (
          <div className="mt-2 divide-y divide-[#121c2e] pl-4 border-l-2 border-[#192742] transition-all">
            {minorFixes.map((minor) => (
              <div
                key={minor.id}
                onClick={() => onSelectItem(minor.drillDownId)}
                className="group flex items-center justify-between py-2 px-2 rounded-lg hover:bg-[#0f192f] cursor-pointer text-xs"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-[10px] uppercase font-semibold text-slate-500 w-16">
                    {minor.pillar}
                  </span>
                  <span className="text-[#8e9eb3] group-hover:text-slate-200">
                    {minor.outcome}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-slate-500">
                  {minor.time}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
