import React, { useState } from 'react';
import { Session } from '../types';
import { Plus, MessageSquare, Trash2, Edit2, Check, X, Search, Sparkles, ChevronRight, Activity, Zap, FileText } from 'lucide-react';

interface SidebarProps {
  sessions: { id: string; title: string; createdAt: string; updatedAt: string; messageCount: number }[];
  activeSessionId: string;
  onSelectSession: (id: string) => void;
  onNewSession: () => void;
  onDeleteSession: (id: string) => void;
  onRenameSession: (id: string, newTitle: string) => void;
  onSelectPrompt: (promptText: string, skillType?: 'default' | 'ship30' | 'artifact_generation') => void;
  onRunTestModal: () => void;
}

const QUICK_PROMPTS = [
  {
    category: 'B2B PLG',
    title: 'Elena Verna: PLG Monetization & PQLs',
    prompt: 'How does Elena Verna define Product-Led Growth and how should we trigger Product Qualified Leads (PQLs) for sales?',
    skill: 'default' as const
  },
  {
    category: 'Founder Mode',
    title: 'Brian Chesky: Founder Mode & Product Craft',
    prompt: 'Explain Brian Chesky’s concept of Founder Mode, why Airbnb eliminated classic PMs, and how they run unified product reviews.',
    skill: 'default' as const
  },
  {
    category: 'Ship 30 for 30',
    title: 'Ship 30 for 30 Essay: Retention & PMF',
    prompt: 'Write a Ship 30 for 30 atomic essay on why baseline cohort retention is the only true test of Product-Market Fit based on Gustaf Alströmer and Casey Winters.',
    skill: 'ship30' as const
  },
  {
    category: 'Prioritization',
    title: 'Shreyas Doshi: LNO Framework',
    prompt: 'Break down Shreyas Doshi’s LNO framework and explain why the 2x2 Impact vs Effort matrix fails in high-agency teams.',
    skill: 'default' as const
  },
  {
    category: 'Interactive Tool',
    title: 'PLG Viral Loop & Payback Simulator',
    prompt: 'Generate an interactive HTML/CSS PLG Viral Loop and CAC Payback simulator based on Elena Verna’s growth mechanics.',
    skill: 'artifact_generation' as const
  }
];

export const Sidebar: React.FC<SidebarProps> = ({
  sessions,
  activeSessionId,
  onSelectSession,
  onNewSession,
  onDeleteSession,
  onRenameSession,
  onSelectPrompt,
  onRunTestModal
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');

  const filteredSessions = sessions.filter(s =>
    s.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const startRename = (id: string, currentTitle: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingId(id);
    setEditTitle(currentTitle);
  };

  const saveRename = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (editTitle.trim()) {
      onRenameSession(id, editTitle.trim());
    }
    setEditingId(null);
  };

  return (
    <aside className="w-72 border-r border-white/[0.08] bg-[#0b0f19] flex flex-col h-full shrink-0 select-none">
      {/* Top CTA */}
      <div className="p-3 border-b border-white/[0.08]">
        <button
          onClick={onNewSession}
          className="w-full py-2.5 px-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-semibold rounded-xl shadow-md shadow-blue-500/20 ring-1 ring-white/20 flex items-center justify-center gap-2 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>New Conversation</span>
        </button>
      </div>

      {/* Sessions Filter */}
      <div className="p-2 border-b border-white/[0.06]">
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-2.5" />
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900/90 border border-white/[0.08] rounded-lg text-xs text-slate-200 placeholder-slate-500 pl-8 pr-2.5 py-1.5 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition-colors shadow-inner"
          />
        </div>
      </div>

      {/* Sessions List */}
      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
          Saved Sessions ({sessions.length})
        </div>

        {filteredSessions.length === 0 ? (
          <div className="p-4 text-center text-xs text-slate-400">
            No matching sessions
          </div>
        ) : (
          filteredSessions.map(session => {
            const isActive = session.id === activeSessionId;
            const isEditing = editingId === session.id;

            return (
              <div
                key={session.id}
                onClick={() => onSelectSession(session.id)}
                className={`group px-2.5 py-2 rounded-xl text-xs cursor-pointer transition-all flex items-center justify-between gap-2 ${
                  isActive
                    ? 'bg-slate-800/95 text-white font-semibold border border-blue-500/30 shadow-md shadow-black/20 ring-1 ring-blue-500/20'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900/80 border border-transparent'
                }`}
              >
                <div className="flex items-center gap-2 min-w-0 flex-1">
                  <MessageSquare className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-blue-400' : 'text-slate-500'}`} />
                  {isEditing ? (
                    <input
                      type="text"
                      value={editTitle}
                      onChange={e => setEditTitle(e.target.value)}
                      onClick={e => e.stopPropagation()}
                      className="bg-slate-950 text-white border border-blue-500 rounded-lg px-2 py-0.5 text-xs w-full focus:outline-none ring-1 ring-blue-400/40"
                      autoFocus
                    />
                  ) : (
                    <span className="truncate block">{session.title}</span>
                  )}
                </div>

                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  {isEditing ? (
                    <>
                      <button
                        onClick={e => saveRename(session.id, e)}
                        className="p-1 text-emerald-400 hover:text-emerald-300"
                        title="Save title"
                      >
                        <Check className="w-3 h-3" />
                      </button>
                      <button
                        onClick={e => {
                          e.stopPropagation();
                          setEditingId(null);
                        }}
                        className="p-1 text-slate-400 hover:text-slate-200"
                        title="Cancel"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={e => startRename(session.id, session.title, e)}
                        className="p-1 text-slate-400 hover:text-slate-200"
                        title="Rename"
                      >
                        <Edit2 className="w-3 h-3" />
                      </button>
                      <button
                        onClick={e => {
                          e.stopPropagation();
                          onDeleteSession(session.id);
                        }}
                        className="p-1 text-slate-400 hover:text-red-400"
                        title="Delete session"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </>
                  )}
                </div>
              </div>
            );
          })
        )}

        {/* Curated Prompt Accelerators */}
        <div className="pt-4 px-2">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-blue-400" />
            Curated PM Playbooks
          </div>
          <div className="space-y-1.5">
            {QUICK_PROMPTS.map((qp, idx) => (
              <button
                key={idx}
                onClick={() => onSelectPrompt(qp.prompt, qp.skill)}
                className="w-full text-left p-2.5 rounded-xl bg-slate-900/60 hover:bg-slate-800/80 border border-white/[0.06] hover:border-blue-500/30 transition-all text-slate-300 hover:text-white group shadow-sm"
              >
                <div className="flex items-center justify-between text-[10px] text-blue-400 font-bold uppercase tracking-wider mb-1">
                  <span>{qp.category}</span>
                  <ChevronRight className="w-2.5 h-2.5 opacity-0 group-hover:opacity-100 transition-opacity text-blue-300" />
                </div>
                <div className="text-xs font-medium text-slate-200 line-clamp-1">{qp.title}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* System Health & Test Shortcut */}
      <div className="p-3 border-t border-white/[0.08] bg-[#090d16] text-xs">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5 text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400/50 animate-pulse"></span>
            <span className="font-semibold text-[11px]">System: Fully Grounded</span>
          </div>
          <button
            onClick={onRunTestModal}
            className="text-[11px] text-blue-400 hover:text-blue-300 font-bold hover:underline"
          >
            Run Tests
          </button>
        </div>
        <div className="text-[10px] text-slate-400 flex justify-between font-mono">
          <span>Transcripts: 8 Episodes</span>
          <span>Security: Sandboxed</span>
        </div>
      </div>
    </aside>
  );
};
