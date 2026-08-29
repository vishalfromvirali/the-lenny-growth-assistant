/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Session, Message, Citation, Artifact, ModelConfig } from './types';
import { api } from './services/api';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { ChatView } from './components/ChatView';
import { ArtifactViewer } from './components/ArtifactViewer';
import { CitationDrawer } from './components/CitationDrawer';
import { TranscriptExplorer } from './components/TranscriptExplorer';
import { FDEHandoverModal } from './components/FDEHandoverModal';
import { AlertCircle } from 'lucide-react';

export default function App() {
  const [sessions, setSessions] = useState<{ id: string; title: string; createdAt: string; updatedAt: string; messageCount: number; modelConfig: ModelConfig }[]>([]);
  const [currentSession, setCurrentSession] = useState<Session | null>(null);
  const [activeSessionId, setActiveSessionId] = useState<string>('session-lenny-demo');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activeLatency, setActiveLatency] = useState<number | undefined>(undefined);
  const [errorToast, setErrorToast] = useState<string | null>(null);

  // Model configuration
  const [modelConfig, setModelConfig] = useState<ModelConfig>({
    provider: 'gemini',
    modelName: 'gemini-3.7-flash',
    temperature: 0.2
  });

  // Modals & Panels state
  const [activeArtifact, setActiveArtifact] = useState<Artifact | null>(null);
  const [isArtifactPanelOpen, setIsArtifactPanelOpen] = useState<boolean>(true);
  const [activeCitation, setActiveCitation] = useState<Citation | null>(null);
  const [isFDEHandoverOpen, setIsFDEHandoverOpen] = useState<boolean>(false);
  const [fdeInitialTab, setFdeInitialTab] = useState<string>('prd');
  const [isTranscriptExplorerOpen, setIsTranscriptExplorerOpen] = useState<boolean>(false);

  // Load Sessions on Mount
  useEffect(() => {
    loadSessions();
  }, []);

  const loadSessions = async () => {
    try {
      const res = await api.getSessions();
      setSessions(res.sessions);
      if (res.sessions.length > 0) {
        loadSession(res.sessions[0].id);
      }
    } catch (err: any) {
      console.error('Failed to load sessions', err);
    }
  };

  const loadSession = async (id: string) => {
    try {
      setActiveSessionId(id);
      const session = await api.getSession(id);
      setCurrentSession(session);
      if (session.activeArtifact) {
        setActiveArtifact(session.activeArtifact);
      }
      if (session.modelConfig) {
        setModelConfig(session.modelConfig);
      }
    } catch (err: any) {
      console.error('Failed to load session details', err);
    }
  };

  const handleNewSession = async () => {
    try {
      const newSession = await api.createSession('New Conversation', modelConfig);
      setSessions(prev => [
        {
          id: newSession.id,
          title: newSession.title,
          createdAt: newSession.createdAt,
          updatedAt: newSession.updatedAt,
          messageCount: 0,
          modelConfig: newSession.modelConfig
        },
        ...prev
      ]);
      setCurrentSession(newSession);
      setActiveSessionId(newSession.id);
      setActiveArtifact(null);
    } catch (err: any) {
      showError('Failed to create new session');
    }
  };

  const handleDeleteSession = async (id: string) => {
    try {
      await api.deleteSession(id);
      const updated = sessions.filter(s => s.id !== id);
      setSessions(updated);
      if (activeSessionId === id && updated.length > 0) {
        loadSession(updated[0].id);
      } else if (updated.length === 0) {
        handleNewSession();
      }
    } catch (err: any) {
      showError('Failed to delete session');
    }
  };

  const handleRenameSession = async (id: string, newTitle: string) => {
    try {
      await api.updateSession(id, { title: newTitle });
      setSessions(prev => prev.map(s => (s.id === id ? { ...s, title: newTitle } : s)));
      if (currentSession && currentSession.id === id) {
        setCurrentSession({ ...currentSession, title: newTitle });
      }
    } catch (err: any) {
      showError('Failed to rename session');
    }
  };

  const handleSendMessage = async (
    text: string,
    skillType: 'default' | 'ship30' | 'artifact_generation' = 'default'
  ) => {
    if (!text.trim()) return;
    setIsLoading(true);

    // Optimistic user message insertion
    const tempUserMsg: Message = {
      id: `temp-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date().toISOString()
    };

    if (currentSession) {
      setCurrentSession({
        ...currentSession,
        messages: [...currentSession.messages, tempUserMsg]
      });
    }

    try {
      const res = await api.sendMessage({
        sessionId: activeSessionId,
        message: text,
        skillType,
        requestedProvider: modelConfig.provider,
        ollamaEndpoint: modelConfig.ollamaEndpoint
      });

      if (currentSession) {
        const newMessages = currentSession.messages
          .filter(m => m.id !== tempUserMsg.id)
          .concat([res.userMessage, res.assistantMessage]);

        const updatedSession = {
          ...currentSession,
          messages: newMessages,
          updatedAt: new Date().toISOString()
        };

        if (res.assistantMessage.artifact) {
          updatedSession.activeArtifact = res.assistantMessage.artifact;
          setActiveArtifact(res.assistantMessage.artifact);
          setIsArtifactPanelOpen(true);
        }

        setCurrentSession(updatedSession);
        setActiveLatency(res.assistantMessage.latencyMs);

        // Update sessions list metadata
        setSessions(prev =>
          prev.map(s =>
            s.id === activeSessionId
              ? { ...s, title: res.session?.title || s.title, messageCount: newMessages.length }
              : s
          )
        );
      }
    } catch (err: any) {
      showError(err.message || 'Failed to generate grounded response');
    } finally {
      setIsLoading(false);
    }
  };

  const showError = (msg: string) => {
    setErrorToast(msg);
    setTimeout(() => setErrorToast(null), 4000);
  };

  return (
    <div className="flex flex-col h-screen w-screen bg-[#090d16] text-slate-100 overflow-hidden font-sans select-none">
      {/* Top Navigation */}
      <Navbar
        modelConfig={modelConfig}
        onModelConfigChange={setModelConfig}
        onOpenFDEHandover={(tab) => {
          setFdeInitialTab(tab || 'prd');
          setIsFDEHandoverOpen(true);
        }}
        onOpenTranscripts={() => setIsTranscriptExplorerOpen(true)}
        hasActiveArtifact={!!activeArtifact}
        isArtifactPanelOpen={isArtifactPanelOpen}
        onToggleArtifactPanel={() => setIsArtifactPanelOpen(!isArtifactPanelOpen)}
        activeLatency={activeLatency}
      />

      {/* Main Workspace with Split-Screen Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sessions Sidebar */}
        <Sidebar
          sessions={sessions}
          activeSessionId={activeSessionId}
          onSelectSession={loadSession}
          onNewSession={handleNewSession}
          onDeleteSession={handleDeleteSession}
          onRenameSession={handleRenameSession}
          onSelectPrompt={(p, skill) => handleSendMessage(p, skill)}
          onRunTestModal={() => {
            setFdeInitialTab('tests');
            setIsFDEHandoverOpen(true);
          }}
        />

        {/* Center Grounded Chat Area */}
        <main className="flex-1 flex flex-col min-w-0 h-full relative bg-[#090d16]">
          <ChatView
            messages={currentSession?.messages || []}
            isLoading={isLoading}
            onSendMessage={handleSendMessage}
            onOpenCitation={setActiveCitation}
            onOpenArtifact={(art) => {
              setActiveArtifact(art);
              setIsArtifactPanelOpen(true);
            }}
            modelConfig={modelConfig}
          />
        </main>

        {/* Right Claude-style Artifact Viewer */}
        {activeArtifact && isArtifactPanelOpen && (
          <ArtifactViewer
            artifact={activeArtifact}
            onClose={() => setIsArtifactPanelOpen(false)}
            isSplitView={true}
          />
        )}
      </div>

      {/* Citation Inspector Drawer Modal */}
      <CitationDrawer
        citation={activeCitation}
        onClose={() => setActiveCitation(null)}
      />

      {/* Full Transcript Explorer Modal */}
      <TranscriptExplorer
        isOpen={isTranscriptExplorerOpen}
        onClose={() => setIsTranscriptExplorerOpen(false)}
        onSelectChunkPrompt={(prompt) => handleSendMessage(prompt)}
      />

      {/* FDE Handover Suite & Automated Test Runner Modal */}
      <FDEHandoverModal
        isOpen={isFDEHandoverOpen}
        onClose={() => setIsFDEHandoverOpen(false)}
        initialTab={fdeInitialTab}
      />

      {/* Toast notification */}
      {errorToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900/95 backdrop-blur-md border border-red-500/40 text-red-200 px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2.5 text-xs shadow-black/40 animate-slideUp">
          <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
          <span>{errorToast}</span>
        </div>
      )}
    </div>
  );
}
