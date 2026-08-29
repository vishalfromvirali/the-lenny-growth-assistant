import React, { useState } from 'react';
import { LENNY_EPISODES } from '../data/lennyTranscripts';
import { X, Search, BookOpen, Clock, Tag, Quote, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';

interface TranscriptExplorerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectChunkPrompt?: (prompt: string) => void;
}

export const TranscriptExplorer: React.FC<TranscriptExplorerProps> = ({
  isOpen,
  onClose,
  onSelectChunkPrompt
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedEpisode, setExpandedEpisode] = useState<string | null>(LENNY_EPISODES[0]?.id || null);

  if (!isOpen) return null;

  const filteredEpisodes = LENNY_EPISODES.filter(ep =>
    ep.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ep.guest.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ep.topics.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#0f1422] border border-white/[0.08] rounded-2xl w-full max-w-4xl h-[90vh] overflow-hidden shadow-2xl shadow-black/50 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-white/[0.08] flex items-center justify-between bg-[#0d121f]/95">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-600/20 border border-indigo-500/30 text-indigo-400 flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-100">Lenny's Podcast Transcript Repository</h2>
              <p className="text-xs text-slate-400">Indexed episodes, timestamps, key takeaways & verbatim dialogue chunks</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-3.5 border-b border-white/[0.08] bg-[#0b0f19]">
          <div className="relative max-w-xl">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search by guest, topic (e.g. Elena Verna, Founder Mode, LNO, Retention)..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full bg-[#090d16] border border-white/[0.08] rounded-xl text-xs text-slate-200 placeholder-slate-500 pl-9 pr-4 py-2.5 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30 transition-colors shadow-inner"
            />
          </div>
        </div>

        {/* Episodes List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {filteredEpisodes.map(ep => {
            const isExpanded = expandedEpisode === ep.id;

            return (
              <div
                key={ep.id}
                className="bg-[#090d16] border border-white/[0.06] hover:border-white/[0.12] rounded-xl overflow-hidden transition-all shadow-sm"
              >
                {/* Episode Card Header */}
                <div
                  onClick={() => setExpandedEpisode(isExpanded ? null : ep.id)}
                  className="p-4 cursor-pointer hover:bg-slate-900/60 flex items-start justify-between gap-4 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/25 text-[10px] font-bold uppercase">
                        Episode #{ep.episodeNumber}
                      </span>
                      <span className="text-xs text-slate-400 font-mono">{ep.duration}</span>
                      <span className="text-xs text-slate-400 font-mono">• {ep.publishedDate}</span>
                    </div>

                    <h3 className="text-sm font-bold text-slate-100 leading-snug">{ep.title}</h3>
                    <div className="text-xs text-blue-400 font-semibold mt-0.5">{ep.guest} — <span className="text-slate-400 font-normal">{ep.guestRole}</span></div>

                    <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">{ep.summary}</p>

                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {ep.topics.map((t, idx) => (
                        <span key={idx} className="px-2 py-0.5 rounded-md bg-slate-900/80 border border-white/[0.08] text-[10px] text-slate-300">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button className="p-2 text-slate-400 hover:text-slate-200">
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </button>
                </div>

                {/* Expanded Details & Chunks */}
                {isExpanded && (
                  <div className="p-4 border-t border-white/[0.08] bg-[#0b0f19]/70 space-y-4">
                    {/* Key Takeaways */}
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-2 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                        Core Frameworks & Takeaways
                      </h4>
                      <ul className="space-y-1.5 text-xs text-slate-300">
                        {ep.keyTakeaways.map((k, kIdx) => (
                          <li key={kIdx} className="flex items-start gap-2">
                            <span className="text-blue-400 font-bold">•</span>
                            <span>{k}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Popular Quote */}
                    <div className="bg-blue-950/25 border-l-4 border-blue-500 p-3.5 rounded-r-xl">
                      <div className="text-[10px] uppercase font-bold text-blue-400 mb-1">Signature Quote</div>
                      <div className="text-xs text-slate-200 italic">"{ep.popularQuote}"</div>
                    </div>

                    {/* Verbatim Chunks */}
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-2 flex items-center gap-1.5">
                        <Quote className="w-3.5 h-3.5 text-indigo-400" />
                        Indexed Dialogue Chunks ({ep.chunks.length})
                      </h4>
                      <div className="space-y-3">
                        {ep.chunks.map(chunk => (
                          <div key={chunk.id} className="bg-[#090d16] p-3.5 rounded-xl border border-white/[0.06] shadow-inner">
                            <div className="flex items-center justify-between text-[11px] mb-1.5">
                              <span className="font-bold text-emerald-400 font-mono">{chunk.timestamp}</span>
                              <div className="flex items-center gap-1">
                                {chunk.tags.map((tg, idx) => (
                                  <span key={idx} className="bg-slate-900 border border-white/[0.08] text-slate-300 px-1.5 py-0.5 rounded text-[10px]">
                                    {tg}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <div className="text-xs text-slate-300 font-mono leading-relaxed whitespace-pre-line bg-[#0d121f] p-3 rounded-lg border border-white/[0.06]">
                              {chunk.content}
                            </div>
                            {onSelectChunkPrompt && (
                              <button
                                onClick={() => {
                                  onSelectChunkPrompt(`Tell me more about what ${chunk.guest} said regarding ${chunk.tags.join(' and ')} in Episode ${ep.episodeNumber}`);
                                  onClose();
                                }}
                                className="mt-2.5 text-[11px] text-blue-400 hover:text-blue-300 font-bold hover:underline"
                              >
                                Ask Assistant About This Section →
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
