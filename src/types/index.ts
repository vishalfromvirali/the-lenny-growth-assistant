export type ModelProvider = 'gemini' | 'ollama' | 'claude' | 'openai' | 'local_fallback';

export interface ModelConfig {
  provider: ModelProvider;
  modelName: string;
  temperature: number;
  ollamaEndpoint?: string;
  isCustomKey?: boolean;
}

export interface TranscriptChunk {
  id: string;
  episodeId: string;
  episodeNumber: number;
  guest: string;
  guestRole: string;
  episodeTitle: string;
  timestamp: string;
  timestampSeconds: number;
  content: string;
  tags: string[];
  keyTakeaway?: string;
  relevanceScore?: number;
}

export interface TranscriptEpisode {
  id: string;
  episodeNumber: number;
  title: string;
  guest: string;
  guestRole: string;
  company: string;
  duration: string;
  publishedDate: string;
  summary: string;
  topics: string[];
  chunks: TranscriptChunk[];
  keyTakeaways: string[];
  popularQuote: string;
}

export type MessageRole = 'user' | 'assistant' | 'system';

export interface Citation {
  chunkId: string;
  episodeTitle: string;
  guest: string;
  timestamp: string;
  quote: string;
  relevanceScore: number;
}

export interface Artifact {
  id: string;
  title: string;
  type: 'html' | 'markdown' | 'growth_framework' | 'calculator' | 'checklist';
  content: string;
  version: number;
  createdAt: string;
  description?: string;
  securityStatus: 'sandboxed' | 'clean' | 'blocked_vector_prevented';
}

export interface Message {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: string;
  citations?: Citation[];
  artifact?: Artifact;
  skillType?: 'default' | 'ship30' | 'artifact_generation' | 'growth_framework';
  modelUsed?: string;
  providerUsed?: ModelProvider;
  latencyMs?: number;
  isGrounded?: boolean;
  groundingConfidence?: number;
}

export interface Session {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  messages: Message[];
  activeArtifact?: Artifact;
  modelConfig: ModelConfig;
}

export interface SearchResult {
  chunk: TranscriptChunk;
  score: number;
  matchedTerms: string[];
}

export interface TestResult {
  id: string;
  name: string;
  category: 'api' | 'rag_grounding' | 'ship30_skill' | 'security_sandbox' | 'persistence';
  status: 'passed' | 'failed' | 'running';
  durationMs: number;
  details: string;
  assertion: string;
}
