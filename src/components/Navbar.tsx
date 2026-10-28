import React, { useState, useRef, useEffect } from 'react';
import {
  ChevronDown,
  Layers,
  Megaphone,
  Shield,
  Bot,
  Bell,
  Coins,
  Sparkles,
  Check,
  User,
  LogOut,
  Settings,
  HelpCircle
} from 'lucide-react';
import { NavTab } from '../types/dashboard';

interface NavbarProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  points?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onTabChange,
  points = 7247,
}) => {
  const [selectedOrg, setSelectedOrg] = useState('Zedu');
  const [isOrgDropdownOpen, setIsOrgDropdownOpen] = useState(false);
  const [isAgentsDropdownOpen, setIsAgentsDropdownOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const orgRef = useRef<HTMLDivElement>(null);
  const agentsRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (orgRef.current && !orgRef.current.contains(e.target as Node)) {
        setIsOrgDropdownOpen(false);
      }
      if (agentsRef.current && !agentsRef.current.contains(e.target as Node)) {
        setIsAgentsDropdownOpen(false);
      }
      if (userRef.current && !userRef.current.contains(e.target as Node)) {
        setIsUserDropdownOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setIsNotificationOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const organizations = ['Zedu', 'Ziki Core Org', 'Acme Labs', 'Personal Workspace'];
  const agentsList = [
    { name: 'Issue Classifier Agent', status: 'Active' },
    { name: 'PR Review Bot', status: 'Active' },
    { name: 'Sprint Points Calculator', status: 'Idle' },
    { name: 'Security Vulnerability Scanner', status: 'Active' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#142036] bg-[#070c18]/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Left Section: Logo + Org Dropdown + Main Tabs */}
        <div className="flex items-center space-x-6">
          {/* Logo & Brand */}
          <button
            onClick={() => onTabChange('dashboard')}
            className="flex items-center space-x-2.5 focus:outline-none group"
            title="Go to Dashboard"
          >
            {/* Ziki Custom Geometric Logo Icon */}
            <div className="relative flex h-7 w-7 items-center justify-center">
              <svg
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7 transition-transform group-hover:scale-105"
              >
                <path
                  d="M6 7H26L11 18H26"
                  stroke="#3b82f6"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="9" cy="24" r="3" fill="#60a5fa" />
              </svg>
            </div>
            <span className="text-xl font-bold tracking-tight text-white group-hover:text-blue-400 transition-colors">
              ziki
            </span>
          </button>

          {/* Org Selector */}
          <div className="relative" ref={orgRef}>
            <button
              onClick={() => setIsOrgDropdownOpen(!isOrgDropdownOpen)}
              className="flex items-center space-x-1.5 text-sm font-medium text-slate-300 hover:text-white transition-colors focus:outline-none"
            >
              <span>{selectedOrg}</span>
              <ChevronDown
                className={`h-3.5 w-3.5 text-slate-400 transition-transform ${
                  isOrgDropdownOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {/* Org Dropdown Menu */}
            {isOrgDropdownOpen && (
              <div className="absolute left-0 mt-2 w-52 rounded-xl border border-[#1e2f4e] bg-[#0c1527] p-1.5 shadow-2xl ring-1 ring-black/40 z-50">
                <div className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  Organizations
                </div>
                {organizations.map((org) => (
                  <button
                    key={org}
                    onClick={() => {
                      setSelectedOrg(org);
                      setIsOrgDropdownOpen(false);
                    }}
                    className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-xs text-left transition-colors ${
                      selectedOrg === org
                        ? 'bg-blue-600/20 text-blue-400 font-medium'
                        : 'text-slate-300 hover:bg-[#15233e] hover:text-white'
                    }`}
                  >
                    <span>{org}</span>
                    {selectedOrg === org && <Check className="h-3.5 w-3.5 text-blue-400" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 pl-2">
            <button
              onClick={() => onTabChange('product')}
              className={`flex items-center space-x-2 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                activeTab === 'product'
                  ? 'bg-[#14233e] text-white'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-[#101b30]'
              }`}
            >
              <Layers className="h-3.5 w-3.5" />
              <span>Product</span>
            </button>

            <button
              onClick={() => onTabChange('marketing')}
              className={`flex items-center space-x-2 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                activeTab === 'marketing'
                  ? 'bg-[#14233e] text-white'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-[#101b30]'
              }`}
            >
              <Megaphone className="h-3.5 w-3.5" />
              <span>Marketing</span>
            </button>

            <button
              onClick={() => onTabChange('security')}
              className={`flex items-center space-x-2 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                activeTab === 'security'
                  ? 'bg-[#14233e] text-white'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-[#101b30]'
              }`}
            >
              <Shield className="h-3.5 w-3.5" />
              <span>Security</span>
            </button>
          </nav>
        </div>

        {/* Right Section: Agents dropdown + User profile + Points + Notification */}
        <div className="flex items-center space-x-3">
          
          {/* Agents Dropdown */}
          <div className="relative" ref={agentsRef}>
            <button
              onClick={() => setIsAgentsDropdownOpen(!isAgentsDropdownOpen)}
              className="flex items-center space-x-1.5 rounded-full border border-[#1b2b48] bg-[#0c162a] px-3 py-1 text-xs font-medium text-slate-300 hover:border-slate-600 hover:text-white transition-all shadow-sm"
            >
              <Bot className="h-3.5 w-3.5 text-blue-400" />
              <span>Agents</span>
              <ChevronDown
                className={`h-3 w-3 text-slate-400 transition-transform ${
                  isAgentsDropdownOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {isAgentsDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 rounded-xl border border-[#1e2f4e] bg-[#0c1527] p-2 shadow-2xl z-50">
                <div className="flex items-center justify-between px-3 py-1.5 border-b border-[#18263f]">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                    Active AI Agents
                  </span>
                  <span className="text-[10px] text-blue-400 font-semibold bg-blue-950/60 px-1.5 py-0.5 rounded">
                    4 Online
                  </span>
                </div>
                <div className="py-1">
                  {agentsList.map((agent) => (
                    <div
                      key={agent.name}
                      className="flex items-center justify-between px-3 py-2 text-xs rounded-lg hover:bg-[#15233e] cursor-pointer"
                      onClick={() => {
                        onTabChange('agents');
                        setIsAgentsDropdownOpen(false);
                      }}
                    >
                      <div className="flex items-center space-x-2">
                        <Sparkles className="h-3 w-3 text-blue-400" />
                        <span className="text-slate-300">{agent.name}</span>
                      </div>
                      <span className="text-[10px] text-emerald-400 bg-emerald-950/40 px-1.5 py-0.5 rounded">
                        {agent.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User Chip */}
          <div className="relative" ref={userRef}>
            <button
              onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
              className="flex items-center space-x-2 rounded-full border border-[#1b2b48] bg-[#0c162a] py-1 pl-1 pr-2.5 text-xs text-slate-200 hover:border-slate-600 hover:text-white transition-all"
            >
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-600 text-[10px] font-bold text-white uppercase tracking-wider">
                UO
              </div>
              <span className="font-medium hidden sm:inline">Uriel Okafor</span>
              <ChevronDown
                className={`h-3 w-3 text-slate-400 transition-transform ${
                  isUserDropdownOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {isUserDropdownOpen && (
              <div className="absolute right-0 mt-2 w-52 rounded-xl border border-[#1e2f4e] bg-[#0c1527] p-1.5 shadow-2xl z-50">
                <div className="px-3 py-2 border-b border-[#18263f]">
                  <p className="text-xs font-semibold text-white">Uriel Okafor</p>
                  <p className="text-[11px] text-slate-400 truncate">uriel@zedu.dev</p>
                </div>
                <div className="py-1">
                  <button
                    onClick={() => {
                      onTabChange('dashboard');
                      setIsUserDropdownOpen(false);
                    }}
                    className="flex w-full items-center space-x-2.5 rounded-lg px-3 py-1.5 text-xs text-slate-300 hover:bg-[#15233e] hover:text-white"
                  >
                    <User className="h-3.5 w-3.5 text-slate-400" />
                    <span>Profile & Account</span>
                  </button>
                  <button
                    onClick={() => setIsUserDropdownOpen(false)}
                    className="flex w-full items-center space-x-2.5 rounded-lg px-3 py-1.5 text-xs text-slate-300 hover:bg-[#15233e] hover:text-white"
                  >
                    <Settings className="h-3.5 w-3.5 text-slate-400" />
                    <span>Preferences</span>
                  </button>
                  <button
                    onClick={() => setIsUserDropdownOpen(false)}
                    className="flex w-full items-center space-x-2.5 rounded-lg px-3 py-1.5 text-xs text-slate-300 hover:bg-[#15233e] hover:text-white"
                  >
                    <HelpCircle className="h-3.5 w-3.5 text-slate-400" />
                    <span>Documentation</span>
                  </button>
                </div>
                <div className="border-t border-[#18263f] pt-1">
                  <button
                    onClick={() => setIsUserDropdownOpen(false)}
                    className="flex w-full items-center space-x-2.5 rounded-lg px-3 py-1.5 text-xs text-rose-400 hover:bg-rose-950/20"
                  >
                    <LogOut className="h-3.5 w-3.5" />
                    <span>Log Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Points Chip */}
          <div className="flex items-center space-x-1.5 rounded-full border border-amber-600/40 bg-[#1e190a]/80 px-2.5 py-1 text-xs font-semibold text-amber-300 shadow-sm hover:border-amber-500/60 transition-colors cursor-default">
            <Coins className="h-3.5 w-3.5 text-amber-400" />
            <span>{points.toLocaleString()} pts</span>
          </div>

          {/* Notification Bell */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => setIsNotificationOpen(!isNotificationOpen)}
              className="relative flex h-8 w-8 items-center justify-center rounded-full border border-[#1b2b48] bg-[#0c162a] text-slate-300 hover:border-slate-500 hover:text-white transition-all focus:outline-none"
              title="Notifications"
            >
              <Bell className="h-3.5 w-3.5" />
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white shadow">
                1
              </span>
            </button>

            {isNotificationOpen && (
              <div className="absolute right-0 mt-2 w-80 rounded-xl border border-[#1e2f4e] bg-[#0c1527] p-3 shadow-2xl z-50">
                <div className="flex items-center justify-between pb-2 border-b border-[#18263f]">
                  <h4 className="text-xs font-semibold text-white">Notifications</h4>
                  <span className="text-[10px] text-blue-400 hover:underline cursor-pointer">
                    Mark all read
                  </span>
                </div>
                <div className="py-2 space-y-2">
                  <div className="rounded-lg bg-[#111d35] p-2.5 border border-[#1d2d4c]">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-semibold text-blue-400">Points Milestone</span>
                      <span className="text-[10px] text-slate-400">Just now</span>
                    </div>
                    <p className="mt-1 text-xs text-slate-300">
                      You surpassed your weekly requirement with <strong className="text-white">+8747 pts</strong>!
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </header>
  );
};
