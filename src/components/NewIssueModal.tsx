import React, { useState } from 'react';
import { X, Plus, Sparkles } from 'lucide-react';
import { IssueItem } from '../types/dashboard';

interface NewIssueModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (issue: Partial<IssueItem>) => void;
}

export const NewIssueModal: React.FC<NewIssueModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('Bug');
  const [priority, setPriority] = useState<'High' | 'Medium' | 'Low'>('Medium');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onSubmit({
      id: `ZIK-${Math.floor(100 + Math.random() * 900)}`,
      title,
      type,
      priority,
      status: 'Open',
      stage: 'Triage',
      votes: 1,
      reported: 'Just now',
    });

    setTitle('');
    setDescription('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg rounded-2xl border border-[#1e2f4e] bg-[#0c1527] p-6 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#17253d]">
          <div className="flex items-center space-x-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600/20 text-blue-400">
              <Plus className="h-4 w-4" />
            </div>
            <h3 className="text-base font-semibold text-white">Create New Issue</h3>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-slate-400 hover:bg-[#15233e] hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Issue Title
            </label>
            <input
              type="text"
              required
              placeholder="e.g., Fix latency in prompt evaluator"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-xl border border-[#1a2c49] bg-[#09101f] px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Type
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full rounded-xl border border-[#1a2c49] bg-[#09101f] px-3.5 py-2.5 text-xs text-slate-200 focus:border-blue-500 focus:outline-none"
              >
                <option value="Bug">Bug Report</option>
                <option value="Feature">Feature Request</option>
                <option value="Performance">Performance</option>
                <option value="Security">Security</option>
                <option value="Task">Task</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Priority
              </label>
              <select
                value={priority}
                onChange={(e) =>
                  setPriority(e.target.value as 'High' | 'Medium' | 'Low')
                }
                className="w-full rounded-xl border border-[#1a2c49] bg-[#09101f] px-3.5 py-2.5 text-xs text-slate-200 focus:border-blue-500 focus:outline-none"
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Description (Optional)
            </label>
            <textarea
              rows={3}
              placeholder="Provide context or reproduction steps..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full rounded-xl border border-[#1a2c49] bg-[#09101f] px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all"
            />
          </div>

          <div className="rounded-xl border border-[#17253d] bg-[#08101f]/70 p-3 flex items-center space-x-2.5">
            <Sparkles className="h-4 w-4 text-blue-400 shrink-0" />
            <p className="text-[11px] text-slate-400">
              AI Issue Agent will automatically triage and assign story points upon submission.
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-end space-x-3 pt-3 border-t border-[#17253d]">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-[#1c2c47] px-4 py-2 text-xs font-medium text-slate-300 hover:bg-[#14223b] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-500 transition-colors shadow-lg shadow-blue-600/30"
            >
              Create Issue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
