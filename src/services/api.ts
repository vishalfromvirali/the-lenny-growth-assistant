import { Session, Message, TranscriptEpisode, TestResult, ModelConfig, SearchResult } from '../types';

export const api = {
  async getHealth() {
    const res = await fetch('/api/health');
    if (!res.ok) throw new Error('Health check failed');
    return res.json();
  },

  async getSessions(): Promise<{ sessions: { id: string; title: string; createdAt: string; updatedAt: string; messageCount: number; modelConfig: ModelConfig }[] }> {
    const res = await fetch('/api/sessions');
    if (!res.ok) throw new Error('Failed to fetch sessions');
    return res.json();
  },

  async getSession(id: string): Promise<Session> {
    const res = await fetch(`/api/sessions/${id}`);
    if (!res.ok) throw new Error('Failed to fetch session');
    return res.json();
  },

  async createSession(title?: string, modelConfig?: ModelConfig): Promise<Session> {
    const res = await fetch('/api/sessions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, modelConfig })
    });
    if (!res.ok) throw new Error('Failed to create session');
    return res.json();
  },

  async updateSession(id: string, updates: { title?: string; modelConfig?: ModelConfig }): Promise<Session> {
    const res = await fetch(`/api/sessions/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates)
    });
    if (!res.ok) throw new Error('Failed to update session');
    return res.json();
  },

  async deleteSession(id: string): Promise<{ success: boolean }> {
    const res = await fetch(`/api/sessions/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed to delete session');
    return res.json();
  },

  async sendMessage(payload: {
    sessionId: string;
    message: string;
    skillType?: 'default' | 'ship30' | 'artifact_generation';
    requestedProvider?: string;
    ollamaEndpoint?: string;
  }): Promise<{ userMessage: Message; assistantMessage: Message; session: Partial<Session> }> {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'Failed to send message');
    }
    return res.json();
  },

  async getEpisodes(): Promise<{ episodes: TranscriptEpisode[] }> {
    const res = await fetch('/api/transcripts/episodes');
    if (!res.ok) throw new Error('Failed to fetch episodes');
    return res.json();
  },

  async searchTranscripts(query: string, limit: number = 4): Promise<{ results: SearchResult[]; count: number }> {
    const res = await fetch('/api/transcripts/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, limit })
    });
    if (!res.ok) throw new Error('Failed to search transcripts');
    return res.json();
  },

  async runTests(): Promise<{ summary: { total: number; passed: number; failed: number; durationMs: number }; tests: TestResult[] }> {
    const res = await fetch('/api/tests/run', { method: 'POST' });
    if (!res.ok) throw new Error('Failed to run test suite');
    return res.json();
  },

  async getLogs(): Promise<{ logs: { timestamp: string; level: string; message: string; metadata?: any }[] }> {
    const res = await fetch('/api/logs');
    if (!res.ok) throw new Error('Failed to fetch logs');
    return res.json();
  }
};
