import React from 'react';
import { Citation } from '../types';
import { X, Quote, Clock, User, ExternalLink, Sparkles, BookOpen } from 'lucide-react';
import { ALL_TRANSCRIPT_CHUNKS } from '../data/lennyTranscripts';

interface CitationDrawerProps {
  citation: Citation | null;
  onClose: () => void;
}

export const CitationDrawer: React.FC<CitationDrawerProps> = ({ citation, onClose }) => {
  if (!citation) return null;

  const fullChunk = ALL_TRANSCRIPT_CHUNKS.find(c => c.id === citation.chunkId);

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-[#0f1422] border border-white/[0.08] rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl shadow-black/50 flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="p-4 border-b border-white/[0.08] flex items-center justify-between bg-[#0d121f]/95">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 flex items-center justify-center">
              <Quote className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-100">Transcript Grounding Source</h3>
              <div className="text-xs text-slate-400">Verifiable quote & context from Lenny's Podcast</div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs text-slate-300">
          {/* Metadata Grid */}
          <div className="grid grid-cols-2 gap-3 bg-[#090d16] p-4 rounded-xl border border-white/[0.06] shadow-inner">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Guest Speaker</span>
              <span className="text-xs font-bold text-blue-400 flex items-center gap-1 mt-0.5">
                <User className="w-3.5 h-3.5" />
                {citation.guest}
              </span>
            </div>

            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Timestamp Interval</span>
              <span className="text-xs font-mono text-emerald-400 flex items-center gap-1 mt-0.5">
                <Clock className="w-3.5 h-3.5" />
                {citation.timestamp}
              </span>
            </div>

            <div className="col-span-2">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Episode Title</span>
              <span className="text-xs text-slate-200 font-semibold mt-0.5 block">
                {citation.episodeTitle}
              </span>
            </div>
          </div>

          {/* Verbatim Quote Highlight */}
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-amber-400" />
              Verbatim Referenced Quote
            </div>
            <blockquote className="p-4 rounded-xl bg-blue-950/25 border-l-4 border-blue-500 text-slate-100 italic leading-relaxed text-sm shadow-sm">
              "{citation.quote}"
            </blockquote>
          </div>

          {/* Full Chunk Dialogue Context */}
          {fullChunk && (
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                <BookOpen className="w-3 h-3 text-indigo-400" />
                Full Transcript Segment ({fullChunk.tags.join(', ')})
              </div>
              <div className="bg-[#090d16] p-4 rounded-xl border border-white/[0.06] text-slate-300 font-mono text-[11px] leading-relaxed whitespace-pre-line select-text shadow-inner">
                {fullChunk.content}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3.5 border-t border-white/[0.08] bg-[#0d121f]/95 flex items-center justify-between text-[11px] text-slate-400 px-6">
          <span className="font-mono">Relevance Grounding Score: <strong className="text-emerald-400 font-semibold">{(citation.relevanceScore * 100).toFixed(0)}%</strong></span>
          <button
            onClick={onClose}
            className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg transition-colors font-semibold shadow-sm"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
