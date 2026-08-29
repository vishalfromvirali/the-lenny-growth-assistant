import React, { useState } from 'react';
import { Artifact } from '../types';
import { X, Play, Code2, ShieldCheck, Copy, Download, Maximize2, Minimize2, Check, RefreshCw } from 'lucide-react';

interface ArtifactViewerProps {
  artifact: Artifact | null;
  onClose: () => void;
  isSplitView: boolean;
}

export const ArtifactViewer: React.FC<ArtifactViewerProps> = ({
  artifact,
  onClose,
  isSplitView
}) => {
  const [activeTab, setActiveTab] = useState<'preview' | 'code' | 'security'>('preview');
  const [copied, setCopied] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  if (!artifact) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(artifact.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const ext = artifact.type === 'markdown' ? 'md' : 'html';
    const mime = artifact.type === 'markdown' ? 'text/markdown' : 'text/html';
    const blob = new Blob([artifact.content], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${artifact.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}.${ext}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <aside
      className={`border-l border-white/[0.08] bg-[#090d16] flex flex-col transition-all z-20 ${
        isFullscreen
          ? 'fixed inset-0 z-50 border-none'
          : isSplitView
          ? 'w-full lg:w-[540px] xl:w-[640px] h-full'
          : 'hidden'
      }`}
    >
      {/* Header Bar */}
      <div className="h-14 px-4 border-b border-white/[0.08] bg-[#0d121f]/95 backdrop-blur-md flex items-center justify-between">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0">
            <Code2 className="w-4 h-4" />
          </div>
          <div className="truncate">
            <h2 className="text-xs font-bold text-slate-100 truncate">{artifact.title}</h2>
            <div className="text-[10px] text-slate-400 flex items-center gap-1.5 font-mono">
              <span className="uppercase text-indigo-400 font-bold">{artifact.type}</span>
              <span>•</span>
              <span>v{artifact.version}</span>
              <span>•</span>
              <span className="text-emerald-400 flex items-center gap-0.5 font-sans font-medium">
                <ShieldCheck className="w-3 h-3" /> Sandboxed
              </span>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1">
          <button
            onClick={handleCopy}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            title="Copy Source Code"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={handleDownload}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            title="Download Artifact"
          >
            <Download className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors ml-1"
            title="Close Artifact Viewer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Tabs Row */}
      <div className="px-4 py-2 border-b border-white/[0.08] bg-[#0b0f19] flex items-center justify-between text-xs">
        <div className="flex items-center gap-1">
          <button
            onClick={() => setActiveTab('preview')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
              activeTab === 'preview'
                ? 'bg-indigo-600 text-white font-semibold shadow-md shadow-indigo-600/30 ring-1 ring-indigo-400/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Play className="w-3 h-3" />
            Live Preview
          </button>

          <button
            onClick={() => setActiveTab('code')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
              activeTab === 'code'
                ? 'bg-indigo-600 text-white font-semibold shadow-md shadow-indigo-600/30 ring-1 ring-indigo-400/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Code2 className="w-3 h-3" />
            Code
          </button>

          <button
            onClick={() => setActiveTab('security')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
              activeTab === 'security'
                ? 'bg-indigo-600 text-white font-semibold shadow-md shadow-indigo-600/30 ring-1 ring-indigo-400/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <ShieldCheck className="w-3 h-3 text-emerald-400" />
            Security & Sandbox
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-hidden relative bg-[#090d16]">
        {activeTab === 'preview' && (
          <div className="w-full h-full flex flex-col">
            <iframe
              title={artifact.title}
              srcDoc={artifact.content}
              sandbox="allow-scripts"
              className="w-full flex-1 border-none bg-slate-950"
            />
            <div className="p-2.5 border-t border-white/[0.08] bg-[#0b0f19] text-[10px] text-slate-400 flex items-center justify-between px-4">
              <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
                <ShieldCheck className="w-3.5 h-3.5" /> Sandboxed Iframe (Script Execution Allowed • Storage Access Disallowed)
              </span>
              <span className="font-mono text-slate-400">Self-Contained Single File</span>
            </div>
          </div>
        )}

        {activeTab === 'code' && (
          <div className="w-full h-full overflow-auto p-4 font-mono text-xs text-slate-300 bg-[#090d16] select-text">
            <pre className="whitespace-pre-wrap">{artifact.content}</pre>
          </div>
        )}

        {activeTab === 'security' && (
          <div className="p-6 text-xs text-slate-300 space-y-4 overflow-y-auto h-full">
            <div className="bg-[#0f1422] border border-white/[0.08] rounded-xl p-4 shadow-md">
              <h3 className="text-sm font-bold text-slate-100 mb-2 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Artifact Isolation & Sandbox Architecture
              </h3>
              <p className="text-slate-300 leading-relaxed">
                As required by the Forward Deployed Engineer specification, all dynamically generated HTML/JS artifacts are treated as untrusted input. The assistant enforces isolation boundaries to guarantee runtime security:
              </p>
            </div>

            <div className="space-y-2.5">
              <div className="p-3.5 bg-emerald-950/20 border border-emerald-500/30 rounded-xl flex items-start gap-3 shadow-sm">
                <span className="text-emerald-400 font-bold">✓</span>
                <div>
                  <div className="font-bold text-emerald-300">Permitted Capabilities</div>
                  <div className="text-[11px] text-slate-300 mt-0.5">
                    Local DOM manipulation, inline CSS styling, client-side calculator state, reactive event listeners.
                  </div>
                </div>
              </div>

              <div className="p-3.5 bg-red-950/20 border border-red-500/30 rounded-xl flex items-start gap-3 shadow-sm">
                <span className="text-red-400 font-bold">✕</span>
                <div>
                  <div className="font-bold text-red-300">Blocked Security Vectors</div>
                  <div className="text-[11px] text-slate-300 mt-0.5">
                    Parent window navigation (`allow-top-navigation` disabled), session cookie theft (`allow-same-origin` disabled), parent DOM traversal, cross-site credential access.
                  </div>
                </div>
              </div>

              <div className="p-3.5 bg-blue-950/20 border border-blue-500/30 rounded-xl flex items-start gap-3 shadow-sm">
                <span className="text-blue-400 font-bold">ℹ</span>
                <div>
                  <div className="font-bold text-blue-300">CSP Policy Active</div>
                  <div className="text-[11px] text-slate-300 font-mono mt-0.5">
                    Content-Security-Policy: default-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net;
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};
