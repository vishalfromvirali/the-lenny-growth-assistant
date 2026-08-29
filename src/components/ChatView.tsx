import React, { useState, useRef, useEffect } from 'react';
import { Message, Citation, Artifact, ModelConfig } from '../types';
import { Send, Sparkles, FileText, Code2, Quote, ExternalLink, Bot, User, CheckCircle2, ShieldAlert, Cpu } from 'lucide-react';

interface ChatViewProps {
  messages: Message[];
  isLoading: boolean;
  onSendMessage: (text: string, skillType?: 'default' | 'ship30' | 'artifact_generation') => void;
  onOpenCitation: (citation: Citation) => void;
  onOpenArtifact: (artifact: Artifact) => void;
  modelConfig: ModelConfig;
}

export const ChatView: React.FC<ChatViewProps> = ({
  messages,
  isLoading,
  onSendMessage,
  onOpenCitation,
  onOpenArtifact,
  modelConfig
}) => {
  const [inputPrompt, setInputPrompt] = useState('');
  const [selectedSkill, setSelectedSkill] = useState<'default' | 'ship30' | 'artifact_generation'>('default');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputPrompt.trim() || isLoading) return;
    const text = inputPrompt.trim();
    setInputPrompt('');
    onSendMessage(text, selectedSkill);
  };

  const handleQuickSkill = (skill: 'ship30' | 'artifact_generation', contextTitle: string) => {
    if (skill === 'ship30') {
      onSendMessage(`Write a high-impact Ship 30 for 30 atomic essay about ${contextTitle} based on the transcript insights.`, 'ship30');
    } else {
      onSendMessage(`Generate an interactive HTML/CSS calculator and growth framework tool for ${contextTitle}.`, 'artifact_generation');
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-[#090d16] overflow-hidden">
      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
        {messages.map((msg) => {
          const isAssistant = msg.role === 'assistant';

          return (
            <div
              key={msg.id}
              className={`flex gap-3.5 max-w-4xl mx-auto ${isAssistant ? 'items-start' : 'items-start flex-row-reverse'}`}
            >
              {/* Avatar */}
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-white font-bold text-xs shadow-md ring-1 ring-white/15 ${
                  isAssistant
                    ? 'bg-gradient-to-br from-blue-600 via-indigo-600 to-indigo-700 text-white shadow-blue-500/20'
                    : 'bg-slate-800 text-slate-200'
                }`}
              >
                {isAssistant ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
              </div>

              {/* Message Bubble Container */}
              <div className={`flex-1 min-w-0 ${isAssistant ? 'pr-4' : 'pl-4'}`}>
                {/* Header Meta */}
                <div className={`flex items-center gap-2 mb-1.5 text-[11px] ${isAssistant ? 'justify-start' : 'justify-end'}`}>
                  <span className="font-bold text-slate-200">
                    {isAssistant ? 'Lenny Growth Assistant' : 'You'}
                  </span>
                  {isAssistant && msg.providerUsed && (
                    <span className="text-[10px] bg-slate-800/90 text-slate-300 border border-white/[0.08] px-2 py-0.5 rounded-md font-mono">
                      {msg.modelUsed || msg.providerUsed}
                    </span>
                  )}
                  {msg.latencyMs && (
                    <span className="text-[10px] text-slate-400 font-mono">
                      {msg.latencyMs}ms
                    </span>
                  )}
                </div>

                {/* Bubble Body */}
                <div
                  className={`rounded-2xl p-4 md:p-5 text-sm leading-relaxed ${
                    isAssistant
                      ? 'bg-[#0f1422] text-slate-100 border border-white/[0.08] shadow-xl shadow-black/30'
                      : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-600/20'
                  }`}
                >
                  {/* Skill Badge if active */}
                  {isAssistant && msg.skillType === 'ship30' && (
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-300 border border-amber-500/30 text-xs font-semibold mb-3">
                      <FileText className="w-3.5 h-3.5" />
                      Ship 30 for 30 Structured Essay (~1,250 words)
                    </div>
                  )}

                  {/* Rendered Text with basic Markdown line parsing */}
                  <div className="prose prose-invert max-w-none space-y-3">
                    {msg.content.split('\n\n').map((paragraph, pIdx) => {
                      if (paragraph.startsWith('### ')) {
                        return (
                          <h3 key={pIdx} className="text-base font-bold text-blue-400 mt-4 mb-2">
                            {paragraph.replace('### ', '')}
                          </h3>
                        );
                      }
                      if (paragraph.startsWith('## ')) {
                        return (
                          <h2 key={pIdx} className="text-lg font-bold text-slate-100 mt-5 mb-2">
                            {paragraph.replace('## ', '')}
                          </h2>
                        );
                      }
                      if (paragraph.startsWith('# ')) {
                        return (
                          <h1 key={pIdx} className="text-xl font-extrabold text-slate-100 mt-4 mb-3">
                            {paragraph.replace('# ', '')}
                          </h1>
                        );
                      }
                      if (paragraph.startsWith('> ')) {
                        return (
                          <blockquote key={pIdx} className="border-l-4 border-blue-500 pl-3 italic text-slate-200 my-2 bg-blue-950/30 py-2 rounded-r-lg">
                            {paragraph.replace('> ', '')}
                          </blockquote>
                        );
                      }
                      return (
                        <p key={pIdx} className="text-slate-200 leading-relaxed whitespace-pre-line">
                          {paragraph}
                        </p>
                      );
                    })}
                  </div>

                  {/* Grounding Citations Pills */}
                  {isAssistant && msg.citations && msg.citations.length > 0 && (
                    <div className="mt-4 pt-3.5 border-t border-white/[0.08]">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                        <Quote className="w-3 h-3 text-emerald-400" />
                        Grounded Sources ({msg.citations.length})
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {msg.citations.map((cite, cIdx) => (
                          <button
                            key={cIdx}
                            onClick={() => onOpenCitation(cite)}
                            className="inline-flex items-center gap-1.5 text-xs bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white px-2.5 py-1.5 rounded-lg border border-white/[0.08] hover:border-emerald-500/40 transition-colors group text-left shadow-sm"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                            <span className="font-semibold text-blue-400">{cite.guest}</span>
                            <span className="text-slate-400 font-mono text-[10px]">{cite.timestamp}</span>
                            <ExternalLink className="w-2.5 h-2.5 opacity-0 group-hover:opacity-100 transition-opacity text-slate-400" />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Attached Artifact Preview Button */}
                  {isAssistant && msg.artifact && (
                    <div className="mt-4 pt-3.5 border-t border-white/[0.08]">
                      <div className="bg-gradient-to-r from-indigo-950/40 to-slate-900/60 border border-indigo-500/30 rounded-xl p-3.5 flex items-center justify-between shadow-sm">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-indigo-600/30 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                            <Code2 className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-indigo-200">{msg.artifact.title}</div>
                            <div className="text-[11px] text-indigo-400/80">Interactive Sandbox Artifact • v{msg.artifact.version}</div>
                          </div>
                        </div>
                        <button
                          onClick={() => onOpenArtifact(msg.artifact!)}
                          className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg shadow-md shadow-indigo-600/20 transition-all"
                        >
                          Launch in Viewer
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Quick Action Tools for Assistant Message */}
                  {isAssistant && (
                    <div className="mt-3.5 pt-2.5 flex flex-wrap items-center gap-2 text-[11px]">
                      <button
                        onClick={() => handleQuickSkill('ship30', msg.citations?.[0]?.guest || 'Product Growth')}
                        className="px-2.5 py-1 rounded-lg bg-slate-900/90 hover:bg-slate-800 border border-white/[0.08] hover:border-amber-500/30 text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors shadow-sm"
                      >
                        <FileText className="w-3 h-3 text-amber-400" />
                        Turn into Ship 30 for 30 Essay
                      </button>

                      <button
                        onClick={() => handleQuickSkill('artifact_generation', msg.citations?.[0]?.guest || 'Growth Model')}
                        className="px-2.5 py-1 rounded-lg bg-slate-900/90 hover:bg-slate-800 border border-white/[0.08] hover:border-indigo-500/30 text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors shadow-sm"
                      >
                        <Code2 className="w-3 h-3 text-indigo-400" />
                        Generate Interactive Calculator
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex gap-3.5 max-w-4xl mx-auto items-start">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white shrink-0 animate-pulse shadow-md">
              <Bot className="w-4 h-4" />
            </div>
            <div className="bg-[#0f1422] border border-white/[0.08] rounded-2xl p-4 text-xs text-slate-300 flex items-center gap-3 shadow-lg">
              <div className="w-2 h-2 rounded-full bg-blue-400 animate-ping"></div>
              <span>Searching transcript index & synthesizing grounded insight...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Box & Skill Selection Form */}
      <div className="p-4 border-t border-white/[0.08] bg-[#0b0f19]">
        <form onSubmit={handleSend} className="max-w-4xl mx-auto space-y-2.5">
          {/* Skill Selector Tabs */}
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Skill Mode:</span>
            
            <button
              type="button"
              onClick={() => setSelectedSkill('default')}
              className={`px-2.5 py-1 text-xs rounded-lg font-medium transition-all ${
                selectedSkill === 'default'
                  ? 'bg-blue-600/20 text-blue-400 border border-blue-500/40 font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Direct Advice
            </button>

            <button
              type="button"
              onClick={() => setSelectedSkill('ship30')}
              className={`px-2.5 py-1 text-xs rounded-lg font-medium transition-all flex items-center gap-1.5 ${
                selectedSkill === 'ship30'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <FileText className="w-3.5 h-3.5 text-amber-400" />
              Ship 30 for 30 (~1,250w Essay)
            </button>

            <button
              type="button"
              onClick={() => setSelectedSkill('artifact_generation')}
              className={`px-2.5 py-1 text-xs rounded-lg font-medium transition-all flex items-center gap-1.5 ${
                selectedSkill === 'artifact_generation'
                  ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Code2 className="w-3.5 h-3.5 text-indigo-400" />
              Interactive Artifact
            </button>
          </div>

          {/* Text Input Row */}
          <div className="flex items-center gap-2 bg-[#0f1422] border border-white/[0.08] rounded-xl p-1.5 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all shadow-inner">
            <input
              type="text"
              value={inputPrompt}
              onChange={e => setInputPrompt(e.target.value)}
              placeholder={
                selectedSkill === 'ship30'
                  ? 'Ask for a Ship 30 for 30 essay (e.g. "Draft an essay on why PMs fail with Impact vs Effort")...'
                  : (selectedSkill === 'artifact_generation'
                    ? 'Request an interactive HTML tool (e.g. "Build a PLG CAC Payback simulator")...'
                    : 'Ask any product, growth, or strategy question from Lenny\'s Podcast...')
              }
              className="flex-1 bg-transparent text-sm text-slate-100 placeholder-slate-500 px-3 py-2 focus:outline-none"
              disabled={isLoading}
            />

            <button
              type="submit"
              disabled={!inputPrompt.trim() || isLoading}
              className="p-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:opacity-40 disabled:hover:from-blue-600 text-white rounded-lg transition-all shadow-md shadow-blue-500/20 ring-1 ring-white/10"
              title="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
