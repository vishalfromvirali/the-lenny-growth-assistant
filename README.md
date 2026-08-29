# The Lenny Growth Assistant 🎙️
### Forward Deployed AI Assistant Grounded in Lenny's Podcast Transcripts

[![Health](https://img.shields.io/badge/System-Healthy-10b981)]()
[![Model](https://img.shields.io/badge/Model-Gemini%203.7%20%7C%20Ollama-3b82f6)]()
[![Artifacts](https://img.shields.io/badge/Artifacts-Sandboxed%20Iframe-8b5cf6)]()
[![Skill](https://img.shields.io/badge/Skill-Ship%2030%20for%2030-f59e0b)]()

---

## 1. Overview
**The Lenny Growth Assistant** is an enterprise-grade, full-stack AI web application designed for product management and growth teams. It ingests transcript corpora from *Lenny's Podcast*, answers complex PM/growth queries strictly grounded in guest insights, drafts **Ship 30 for 30** atomic essays, and renders interactive **Claude-style artifacts** (calculators, frameworks, interactive tools) in a secure sandbox beside the chat.

---

## 2. Quickstart (One-Command Startup)

### Option A: Local Development
\`\`\`bash
# 1. Install dependencies
npm install

# 2. Run the full-stack app (binds to http://localhost:3000)
npm run dev
\`\`\`

### Option B: Docker Compose
\`\`\`bash
docker-compose up --build
\`\`\`

---

## 3. Environment Configuration (`.env`)

Copy `.env.example` to `.env`:
\`\`\`env
# Cloud Model Provider
GEMINI_API_KEY="your-gemini-api-key"

# Local Model Provider (Ollama)
OLLAMA_ENDPOINT="http://localhost:11434"
\`\`\`

> *Note: If `GEMINI_API_KEY` is not provided or Ollama is offline, the built-in deterministic RAG fallback engine will execute immediately, guaranteeing zero broken screens.*

---

## 4. Key Capabilities & Features

1. **Grounded RAG Search & Citations**:
   - Transcripts indexed across Elena Verna, Brian Chesky, Shreyas Doshi, Casey Winters, Julie Zhuo, Sean Ellis, Gustaf Alströmer, Gibson Biddle, etc.
   - Clickable citation pills with exact episode numbers, timestamps, and verbatim quotes.

2. **Ship 30 for 30 Content Skill**:
   - Generates ~1,250-word structured essays following 1-Sentence Hook, 1-3-1 cadence, bold skimmable highlights, and tactical implementation checklists.

3. **In-App Claude-Style Artifact Viewer**:
   - Split-screen workspace rendering interactive HTML/CSS calculators, growth simulators, and Markdown PRDs.
   - Strict `iframe` security sandboxing preventing XSS and parent-window access.

4. **Multi-Model Routing & Toggle**:
   - Switch live between Cloud (Gemini 3.7 Flash) and Local (Ollama `llama3.2` / `phi3` / local fallback engine).

5. **FDE Handover Suite & Automated Test Runner**:
   - In-app interactive tabs for PRD, Architecture, Design, README, Agent Audit Logs, and live automated test executions.

---

## 5. Running the Automated Tests
Click the **"FDE Handover Suite"** button in the app header and select **"Automated Test Runner"**, or call the API endpoint:
\`\`\`bash
curl -X POST http://localhost:3000/api/tests/run
\`\`\`
