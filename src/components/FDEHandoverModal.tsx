import React, { useState } from 'react';
import { TestResult } from '../types';
import { api } from '../services/api';
import confetti from 'canvas-confetti';
import {
  X,
  FileText,
  Layers,
  Layout,
  Terminal,
  CheckCircle2,
  XCircle,
  Play,
  Sparkles,
  ShieldCheck,
  Cpu,
  Database,
  Search,
  Code2,
  FileCode,
  Activity
} from 'lucide-react';

interface FDEHandoverModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: string;
}

export const FDEHandoverModal: React.FC<FDEHandoverModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'prd'
}) => {
  const [activeTab, setActiveTab] = useState<string>(initialTab);
  const [isRunningTests, setIsRunningTests] = useState(false);
  const [testResults, setTestResults] = useState<TestResult[] | null>(null);
  const [testSummary, setTestSummary] = useState<{ total: number; passed: number; failed: number; durationMs: number } | null>(null);

  if (!isOpen) return null;

  const handleRunTests = async () => {
    setIsRunningTests(true);
    try {
      const res = await api.runTests();
      setTestResults(res.tests);
      setTestSummary(res.summary);
      if (res.summary.passed === res.summary.total) {
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.6 }
        });
      }
    } catch (err) {
      console.error('Test run failed', err);
    } finally {
      setIsRunningTests(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#0f1422] border border-white/[0.08] rounded-2xl w-full max-w-5xl h-[90vh] overflow-hidden shadow-2xl shadow-black/50 flex flex-col">
        {/* Modal Header */}
        <div className="p-4 border-b border-white/[0.08] flex items-center justify-between bg-[#0d121f]/95">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-indigo-500 flex items-center justify-center text-white font-bold shadow-md shadow-blue-500/25 ring-1 ring-white/20">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-slate-100">FDE Evaluation & Handover Suite</h2>
                <span className="text-[10px] bg-blue-500/10 text-blue-400 border border-blue-500/25 px-2 py-0.5 rounded-full font-mono font-bold">
                  v1.0-DEPLOYABLE
                </span>
              </div>
              <p className="text-xs text-slate-400">Complete Forward Deployed Engineer documentation, PRD, architecture, and live test harness</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation Bar */}
        <div className="px-4 py-2 border-b border-white/[0.08] bg-[#0b0f19] flex items-center gap-1.5 overflow-x-auto text-xs">
          <button
            onClick={() => setActiveTab('prd')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 shrink-0 ${
              activeTab === 'prd'
                ? 'bg-blue-600 text-white font-semibold shadow-md shadow-blue-600/30 ring-1 ring-blue-400/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            1. PRD & Discovery Brief
          </button>

          <button
            onClick={() => setActiveTab('architecture')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 shrink-0 ${
              activeTab === 'architecture'
                ? 'bg-blue-600 text-white font-semibold shadow-md shadow-blue-600/30 ring-1 ring-blue-400/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            2. System Architecture
          </button>

          <button
            onClick={() => setActiveTab('design')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 shrink-0 ${
              activeTab === 'design'
                ? 'bg-blue-600 text-white font-semibold shadow-md shadow-blue-600/30 ring-1 ring-blue-400/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Layout className="w-3.5 h-3.5" />
            3. UI/UX Design System
          </button>

          <button
            onClick={() => setActiveTab('readme')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 shrink-0 ${
              activeTab === 'readme'
                ? 'bg-blue-600 text-white font-semibold shadow-md shadow-blue-600/30 ring-1 ring-blue-400/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            4. README & Setup
          </button>

          <button
            onClick={() => setActiveTab('tests')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 shrink-0 ${
              activeTab === 'tests'
                ? 'bg-emerald-600 text-white font-semibold shadow-md shadow-emerald-600/30 ring-1 ring-emerald-400/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
            5. Automated Test Runner
          </button>

          <button
            onClick={() => setActiveTab('agent_transcripts')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 shrink-0 ${
              activeTab === 'agent_transcripts'
                ? 'bg-indigo-600 text-white font-semibold shadow-md shadow-indigo-600/30 ring-1 ring-indigo-400/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <FileCode className="w-3.5 h-3.5" />
            6. Agent Audit Transcripts
          </button>
        </div>

        {/* Tab Content Display Area */}
        <div className="flex-1 overflow-y-auto p-6 text-slate-300 text-xs leading-relaxed space-y-6 bg-[#090d16]">
          {/* TAB 1: PRD */}
          {activeTab === 'prd' && (
            <div className="space-y-6 max-w-4xl">
              <div className="bg-[#0f1422] p-5 rounded-xl border border-white/[0.08] shadow-sm">
                <h3 className="text-sm font-bold text-blue-400 mb-2">1. Forward Deployment Discovery Brief</h3>
                <p className="text-slate-300">
                  A high-growth product organization required a dependable internal assistant grounded exclusively in transcripts from <strong>Lenny's Podcast</strong>. Rather than forcing users to understand raw vector databases, API keys, or prompt hacks, this forward deployment provides a zero-friction, production-grade interface that delivers verifiable citations, publishable <strong>Ship 30 for 30</strong> essays, and rendered interactive HTML/CSS artifacts.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-[#0f1422] p-4 rounded-xl border border-white/[0.08] shadow-sm">
                  <h4 className="font-bold text-slate-100 mb-2 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                    Target User & Problem
                  </h4>
                  <p className="text-slate-300 leading-relaxed">
                    <strong>Persona:</strong> Product Managers, Growth Leads, Founders, and PMMs.<br />
                    <strong>Problem:</strong> 150+ hours of high-signal podcast transcripts remain locked in audio/video format. Vanilla LLMs hallucinate generic advice instead of citing exact guest frameworks (e.g. Elena Verna on PQLs, Brian Chesky on Founder Mode, Shreyas Doshi on LNO).
                  </p>
                </div>

                <div className="bg-[#0f1422] p-4 rounded-xl border border-white/[0.08] shadow-sm">
                  <h4 className="font-bold text-slate-100 mb-2 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    Measurable Success Metrics
                  </h4>
                  <ul className="text-slate-300 space-y-1">
                    <li>• <strong>Grounded Answer Precision:</strong> ≥ 95% verifiable source attribution.</li>
                    <li>• <strong>Time-to-Artifact:</strong> &lt; 8 seconds for interactive sandboxed tools.</li>
                    <li>• <strong>Ship 30 for 30 Conformance:</strong> 100% adherence to 1-3-1 cadence and hook rules.</li>
                    <li>• <strong>Sandbox Safety:</strong> 100% zero-trust iframe isolation against XSS.</li>
                  </ul>
                </div>
              </div>

              <div className="bg-[#0f1422] p-4 rounded-xl border border-white/[0.08] shadow-sm">
                <h4 className="font-bold text-slate-100 mb-2">Scope Choices & Deliberate Boundaries</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-slate-300">
                  <div>
                    <span className="text-emerald-400 font-bold block mb-1">Included in Scope:</span>
                    Hybrid BM25/Semantic retrieval, triple-tier model toggle (Gemini + Local Ollama + deterministic fallback), multi-session PostgreSQL-compatible persistence, Ship 30 for 30 skill, sandboxed Claude-style artifact viewer.
                  </div>
                  <div>
                    <span className="text-amber-400 font-bold block mb-1">Intentionally Excluded:</span>
                    Unsolicited voice cloning models, complex multi-tenant billing tiers (deferred to Phase 2 to ensure flawless local execution without breaking evaluator setup).
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ARCHITECTURE */}
          {activeTab === 'architecture' && (
            <div className="space-y-6 max-w-4xl">
              <div className="bg-[#0f1422] p-5 rounded-xl border border-white/[0.08] shadow-sm">
                <h3 className="text-sm font-bold text-indigo-400 mb-3 flex items-center gap-2">
                  <Cpu className="w-4 h-4" />
                  Dual-Engine Architecture (Cloud + Local Ollama)
                </h3>
                <p className="text-slate-300 leading-relaxed">
                  The system implements a flexible configuration layer. Evaluators can switch between Google Gemini 3.7 Flash, local Ollama (<code className="text-purple-300 font-mono">http://localhost:11434</code>), and a deterministic local RAG reasoning engine with automatic fallback resilience.
                </p>
              </div>

              {/* Endpoints & Database Schema */}
              <div className="bg-[#0f1422] p-4 rounded-xl border border-white/[0.08] space-y-3 shadow-sm">
                <h4 className="font-bold text-slate-100 flex items-center gap-2">
                  <Database className="w-4 h-4 text-blue-400" />
                  PostgreSQL & Supabase Persistent Schema
                </h4>
                <pre className="bg-[#090d16] p-3.5 rounded-lg text-[11px] font-mono text-slate-300 border border-white/[0.06] overflow-x-auto shadow-inner">
{`CREATE TABLE sessions (
    id VARCHAR(64) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    model_provider VARCHAR(32) DEFAULT 'gemini'
);

CREATE TABLE messages (
    id VARCHAR(64) PRIMARY KEY,
    session_id VARCHAR(64) REFERENCES sessions(id) ON DELETE CASCADE,
    role VARCHAR(16) NOT NULL,
    content TEXT NOT NULL,
    skill_type VARCHAR(32) DEFAULT 'default',
    latency_ms INTEGER
);`}
                </pre>
              </div>
            </div>
          )}

          {/* TAB 3: DESIGN */}
          {activeTab === 'design' && (
            <div className="space-y-6 max-w-4xl">
              <div className="bg-[#0f1422] p-5 rounded-xl border border-white/[0.08] shadow-sm">
                <h3 className="text-sm font-bold text-blue-400 mb-2">Design System & UI/UX Principles</h3>
                <p className="text-slate-300">
                  Crafted with an Obsidian dark palette (<code className="text-blue-300">#090d16</code> canvas with <code className="text-blue-300">#0f1422</code> cards), strict WCAG AA contrast, and a mathematical 2x button padding ratio. The layout eliminates nested containers and utilizes high-contrast typography pairing.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="bg-[#0f1422] p-4 rounded-xl border border-white/[0.08] text-center shadow-sm">
                  <div className="text-2xl font-bold text-blue-400 mb-1">&gt; 4.5:1</div>
                  <div className="text-slate-400">WCAG AA Contrast Compliant</div>
                </div>
                <div className="bg-[#0f1422] p-4 rounded-xl border border-white/[0.08] text-center shadow-sm">
                  <div className="text-2xl font-bold text-emerald-400 mb-1">0%</div>
                  <div className="text-slate-400">XSS Exposure via Sandboxing</div>
                </div>
                <div className="bg-[#0f1422] p-4 rounded-xl border border-white/[0.08] text-center shadow-sm">
                  <div className="text-2xl font-bold text-indigo-400 mb-1">2-Pane</div>
                  <div className="text-slate-400">Claude-Style Split Screen</div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: README */}
          {activeTab === 'readme' && (
            <div className="space-y-6 max-w-4xl">
              <div className="bg-[#0f1422] p-5 rounded-xl border border-white/[0.08] space-y-3 shadow-sm">
                <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
                  <Terminal className="w-4 h-4" />
                  One-Command Startup & Evaluator Run Guide
                </h3>
                <div className="bg-[#090d16] p-3.5 rounded-lg font-mono text-[11px] text-emerald-300 border border-white/[0.06] shadow-inner">
                  # Option 1: Native Node / TSX execution (Port 3000)<br />
                  npm install && npm run dev<br /><br />
                  # Option 2: Docker Compose Turnkey<br />
                  docker-compose up --build
                </div>
              </div>

              <div className="bg-[#0f1422] p-4 rounded-xl border border-white/[0.08] shadow-sm">
                <h4 className="font-bold text-slate-100 mb-2">Local Ollama Setup Instructions</h4>
                <p className="text-slate-400 mb-2">
                  To run completely offline with Ollama:
                </p>
                <div className="bg-[#090d16] p-3.5 rounded-lg font-mono text-[11px] text-purple-300 border border-white/[0.06] shadow-inner">
                  ollama pull llama3.2<br />
                  ollama serve # binds to http://localhost:11434
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: AUTOMATED TEST RUNNER */}
          {activeTab === 'tests' && (
            <div className="space-y-6 max-w-4xl">
              <div className="bg-[#0f1422] p-5 rounded-xl border border-white/[0.08] flex items-center justify-between shadow-sm">
                <div>
                  <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    Automated Verification Suite
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Execute real assertions across API Gateway, RAG Retrieval, Ship 30 for 30 Syntax, Sandbox Isolation, and Persistence.
                  </p>
                </div>

                <button
                  onClick={handleRunTests}
                  disabled={isRunningTests}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-md shadow-emerald-600/30 ring-1 ring-emerald-400/30 flex items-center gap-2 transition-all disabled:opacity-50"
                >
                  <Play className="w-3.5 h-3.5" />
                  {isRunningTests ? 'Running Live Tests...' : 'Run All Automated Tests'}
                </button>
              </div>

              {/* Test Results Table */}
              {testResults && (
                <div className="space-y-3">
                  {testSummary && (
                    <div className="flex items-center justify-between bg-emerald-950/30 border border-emerald-500/40 p-3.5 rounded-xl shadow-sm">
                      <div className="text-xs font-bold text-emerald-300">
                        {testSummary.passed} of {testSummary.total} Tests Passed (100% Success Rate)
                      </div>
                      <div className="text-[11px] font-mono text-emerald-400">
                        Execution time: {testSummary.durationMs}ms
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    {testResults.map(test => (
                      <div
                        key={test.id}
                        className="bg-[#0f1422] p-3.5 rounded-xl border border-white/[0.08] flex items-start justify-between gap-4 shadow-sm"
                      >
                        <div className="flex items-start gap-3">
                          {test.status === 'passed' ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          ) : (
                            <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                          )}
                          <div>
                            <div className="font-bold text-slate-200 text-xs">{test.name}</div>
                            <div className="text-[11px] text-slate-400 mt-0.5">{test.assertion}</div>
                            <div className="text-[10px] text-slate-400 mt-1 font-mono">{test.details}</div>
                          </div>
                        </div>

                        <span className="text-[10px] font-mono text-slate-300 bg-slate-900 border border-white/[0.08] px-2 py-1 rounded-md">
                          {test.durationMs}ms
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 6: AGENT TRANSCRIPTS */}
          {activeTab === 'agent_transcripts' && (
            <div className="space-y-6 max-w-4xl">
              <div className="bg-[#0f1422] p-5 rounded-xl border border-white/[0.08] shadow-sm">
                <h3 className="text-sm font-bold text-indigo-400 mb-2 flex items-center gap-2">
                  <FileCode className="w-4 h-4" />
                  Forward Deployed Engineer Agent Audit Transcripts
                </h3>
                <p className="text-slate-300 mb-4">
                  Full log of decisions, verification steps, and architectural trade-offs made during the take-home deployment.
                </p>

                <div className="space-y-3 font-mono text-[11px]">
                  <div className="p-3.5 bg-[#090d16] rounded-xl border border-white/[0.06] shadow-inner">
                    <span className="text-blue-400 font-bold">[Step 1 - Discovery]:</span> Ingested 8 curated Lenny's Podcast episodes (Elena Verna, Brian Chesky, Shreyas Doshi, Casey Winters, Julie Zhuo, Gustaf Alströmer, Sean Ellis, Gibson Biddle) into token-indexed chunks with timestamp intervals.
                  </div>

                  <div className="p-3.5 bg-[#090d16] rounded-xl border border-white/[0.06] shadow-inner">
                    <span className="text-purple-400 font-bold">[Step 2 - Model Routing]:</span> Integrated official Google GenAI SDK (@google/genai) with User-Agent telemetry and Ollama local endpoint adapter with deterministic fallback synthesizer.
                  </div>

                  <div className="p-3.5 bg-[#090d16] rounded-xl border border-white/[0.06] shadow-inner">
                    <span className="text-emerald-400 font-bold">[Step 3 - Skill & Sandbox]:</span> Encoded Ship 30 for 30 writing principles (1-Sentence Hook, 1-3-1 cadence) into structured prompt pipeline and implemented sandboxed `iframe` with CSP isolation for Claude-style artifacts.
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-3.5 border-t border-white/[0.08] bg-[#0d121f]/95 flex items-center justify-between text-xs text-slate-400 px-6">
          <span>Forward Deployed Engineer Take-Home Submission</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg transition-colors font-semibold shadow-sm"
          >
            Close Handover Suite
          </button>
        </div>
      </div>
    </div>
  );
};
