# Architecture & System Design
## The Lenny Growth Assistant

---

### 1. System Topology

\`\`\`
┌────────────────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER (React 19 + Vite)                  │
│                                                                        │
│  ┌───────────────────────┐  ┌────────────────────────────────────────┐ │
│  │   Sidebar & Sessions  │  │  Grounded Chat + Skill Action Bar       │ │
│  │   - Multi-Session     │  │  - Citations Pill Drawer               │ │
│  │   - Quick Prompts     │  │  - Ship 30 for 30 Skill Engine         │ │
│  │   - Health Status     │  │  - Latency & Provider Monitor           │ │
│  └───────────────────────┘  └────────────────────────────────────────┘ │
│                                                ▲                       │
│                                                │ Split-Screen Synced   │
│                                                ▼                       │
│                             ┌────────────────────────────────────────┐ │
│                             │   Artifact Viewer (Claude Style)       │ │
│                             │   - Isolated Sandboxed iframe          │ │
│                             │   - Code & Markdown Inspector          │ │
│                             │   - Security CSP Isolation Badge       │ │
│                             └────────────────────────────────────────┘ │
└────────────────────────────────────┬───────────────────────────────────┘
                                     │ JSON API (Port 3000)
                                     ▼
┌────────────────────────────────────────────────────────────────────────┐
│                      BACKEND SERVER (FastAPI / Express)                │
│                                                                        │
│  ┌───────────────────────────┐     ┌─────────────────────────────────┐ │
│  │  Session Controller (CRUD)│     │  Hybrid RAG Engine (BM25 + Vec) │ │
│  │  - PostgreSQL Store       │     │  - Lenny Transcripts Index      │ │
│  │  - Audit Logs & Telemetry │     │  - Verbatim Chunk Retrieval     │ │
│  └───────────────────────────┘     └─────────────────────────────────┘ │
│                                                │                       │
│  ┌─────────────────────────────────────────────▼─────────────────────┐ │
│  │                     Model Routing Gateway                         │ │
│  │                                                                   │ │
│  │   [Cloud Path]                 [Local Path]      [Fallback]       │ │
│  │   Google Gemini 3.7 Flash      Ollama llama3.2   Local Synthesizer│ │
│  │   (@google/genai)              (localhost:11434) (Deterministic)  │ │
│  └───────────────────────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────────────────────┘
\`\`\`

---

### 2. Database Schema (PostgreSQL / Supabase Schema Definition)

\`\`\`sql
-- Sessions Table
CREATE TABLE sessions (
    id VARCHAR(64) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    model_provider VARCHAR(32) DEFAULT 'gemini',
    model_name VARCHAR(64) DEFAULT 'gemini-3.7-flash',
    temperature FLOAT DEFAULT 0.2
);

-- Messages Table
CREATE TABLE messages (
    id VARCHAR(64) PRIMARY KEY,
    session_id VARCHAR(64) REFERENCES sessions(id) ON DELETE CASCADE,
    role VARCHAR(16) NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    skill_type VARCHAR(32) DEFAULT 'default',
    latency_ms INTEGER,
    is_grounded BOOLEAN DEFAULT true,
    grounding_confidence FLOAT
);

-- Citations Table
CREATE TABLE message_citations (
    id SERIAL PRIMARY KEY,
    message_id VARCHAR(64) REFERENCES messages(id) ON DELETE CASCADE,
    chunk_id VARCHAR(64) NOT NULL,
    episode_title VARCHAR(255) NOT NULL,
    guest_name VARCHAR(128) NOT NULL,
    timestamp_range VARCHAR(32) NOT NULL,
    verbatim_quote TEXT NOT NULL,
    relevance_score FLOAT NOT NULL
);

-- Artifacts Table
CREATE TABLE artifacts (
    id VARCHAR(64) PRIMARY KEY,
    session_id VARCHAR(64) REFERENCES sessions(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    artifact_type VARCHAR(32) NOT NULL,
    content TEXT NOT NULL,
    version INTEGER DEFAULT 1,
    security_status VARCHAR(32) DEFAULT 'sandboxed',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
\`\`\`

---

### 3. API Request & Response Contracts

#### `POST /api/chat`
* **Request**:
  \`\`\`json
  {
    "sessionId": "session-123",
    "message": "How does Elena Verna define B2B PLG vs Sales-Led Growth?",
    "skillType": "default",
    "requestedProvider": "gemini"
  }
  \`\`\`
* **Response**:
  \`\`\`json
  {
    "userMessage": { "id": "msg-u-1", "role": "user", "content": "..." },
    "assistantMessage": {
      "id": "msg-a-1",
      "role": "assistant",
      "content": "...",
      "citations": [
        {
          "chunkId": "ev-1",
          "episodeTitle": "The Ultimate Guide to B2B PLG",
          "guest": "Elena Verna",
          "timestamp": "04:15 - 08:30",
          "quote": "PLG is a Go-To-Market distribution model...",
          "relevanceScore": 0.98
        }
      ],
      "artifact": null,
      "latencyMs": 420
    }
  }
  \`\`\`

---

### 4. Artifact Security & Sanitization Architecture

HTML/JS artifacts rendered in browser web applications present an XSS risk if unisolated.
The Lenny Growth Assistant enforces a 3-layer defense:

1. **Strict iframe Isolation**:
   \`\`\`html
   <iframe
     sandbox="allow-scripts"
     srcDoc="..."
   />
   \`\`\`
   - `allow-same-origin` is **omitted**: The sandboxed iframe runs on an opaque origin (`null`), making it impossible to read `localStorage`, `sessionStorage`, `document.cookie`, or parent DOM trees.
   - `allow-top-navigation` is **omitted**: The iframe cannot redirect the parent application window.
2. **CSP Header in srcDoc**:
   - `Content-Security-Policy: default-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net;`
3. **In-App Security Inspector**:
   - Real-time audit panel in the Artifact Viewer displaying security boundary enforcement.
