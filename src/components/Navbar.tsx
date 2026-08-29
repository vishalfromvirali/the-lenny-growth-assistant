import React from 'react';
import { ModelConfig, ModelProvider } from '../types';
import { Mic, Sparkles, Code2, BookOpen, Layers, ShieldCheck, Cpu, Activity, RefreshCw } from 'lucide-react';

interface NavbarProps {
  modelConfig: ModelConfig;
  onModelConfigChange: (config: ModelConfig) => void;
  onOpenFDEHandover: (tab?: string) => void;
  onOpenTranscripts: () => void;
  hasActiveArtifact: boolean;
  isArtifactPanelOpen: boolean;
  onToggleArtifactPanel: () => void;
  activeLatency?: number;
  providerStatus?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  modelConfig,
  onModelConfigChange,
  onOpenFDEHandover,
  onOpenTranscripts,
  hasActiveArtifact,
  isArtifactPanelOpen,
  onToggleArtifactPanel,
  activeLatency,
  providerStatus
}) => {
  return (
    <header className="h-16 border-b border-white/[0.08] bg-[#0d121f]/90 backdrop-blur-xl px-4 flex items-center justify-between z-30 sticky top-0">
      {/* Brand Identity */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-500/25 text-white font-bold ring-1 ring-white/20">
          <Mic className="w-5 h-5" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-bold text-slate-100 text-sm tracking-tight">The Lenny Growth Assistant</h1>
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/25">
              FDE Edition
            </span>
          </div>
          <p className="text-xs text-slate-400">Grounded in 150+ hours of Lenny's Podcast transcripts</p>
        </div>
      </div>

      {/* Center Controls & Model Provider Switcher */}
      <div className="hidden md:flex items-center gap-1.5 bg-slate-900/90 border border-white/[0.08] rounded-xl p-1 shadow-inner shadow-black/20">
        <span className="text-xs text-slate-400 px-2 flex items-center gap-1.5 font-medium">
          <Cpu className="w-3.5 h-3.5 text-blue-400" />
          Model:
        </span>
        <button
          onClick={() => onModelConfigChange({ ...modelConfig, provider: 'gemini', modelName: 'gemini-3.7-flash' })}
          className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
            modelConfig.provider === 'gemini'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30 ring-1 ring-blue-400/30'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
          }`}
        >
          <Sparkles className="w-3 h-3" />
          Gemini 3.7 Flash
        </button>

        <button
          onClick={() => onModelConfigChange({ ...modelConfig, provider: 'ollama', modelName: 'llama3.2:1b' })}
          className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
            modelConfig.provider === 'ollama'
              ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30 ring-1 ring-purple-400/30'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
          }`}
        >
          <Cpu className="w-3 h-3" />
          Local Ollama
        </button>

        <button
          onClick={() => onModelConfigChange({ ...modelConfig, provider: 'local_fallback', modelName: 'lenny-rag-engine' })}
          className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
            modelConfig.provider === 'local_fallback'
              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30 ring-1 ring-emerald-400/30'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
          }`}
        >
          <ShieldCheck className="w-3 h-3" />
          RAG Engine
        </button>
      </div>

      {/* Right Actions & Handover Suite */}
      <div className="flex items-center gap-2">
        {activeLatency && (
          <div className="hidden lg:flex items-center gap-1.5 text-[11px] font-mono text-slate-300 bg-slate-900/90 border border-white/[0.08] px-2.5 py-1 rounded-lg">
            <Activity className="w-3 h-3 text-emerald-400" />
            <span>{activeLatency}ms</span>
          </div>
        )}

        <button
          onClick={onOpenTranscripts}
          className="px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-900/80 hover:bg-slate-800/90 border border-white/[0.08] hover:border-slate-700 rounded-lg transition-colors flex items-center gap-1.5"
          title="Browse indexed podcast transcripts"
        >
          <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
          <span className="hidden sm:inline">Transcripts Explorer</span>
        </button>

        {hasActiveArtifact && (
          <button
            onClick={onToggleArtifactPanel}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all flex items-center gap-1.5 ${
              isArtifactPanelOpen
                ? 'bg-indigo-600 text-white border-indigo-400/40 shadow-md shadow-indigo-600/25'
                : 'bg-slate-900/80 text-indigo-300 border-indigo-500/30 hover:bg-indigo-950/40'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Artifact Viewer</span>
          </button>
        )}

        <button
          onClick={() => onOpenFDEHandover()}
          className="px-3.5 py-1.5 text-xs font-semibold text-white bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 rounded-lg shadow-md shadow-blue-500/25 ring-1 ring-white/20 transition-all flex items-center gap-1.5"
        >
          <Layers className="w-3.5 h-3.5" />
          <span>FDE Handover Suite</span>
        </button>
      </div>
    </header>
  );
};
