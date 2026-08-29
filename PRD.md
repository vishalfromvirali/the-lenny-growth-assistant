# Product Requirements Document (PRD)
## Project: The Lenny Growth Assistant (Forward Deployed Engineer Engagement)

---

### 1. Executive Discovery Brief

#### 1.1 User Persona & Problem Statement
* **Primary User**: Product Managers, Growth Leads, Founders, and Product Marketing Managers in high-growth B2B/B2C tech companies.
* **The Problem**: Lenny's Podcast and Newsletter contain world-class insights from the top 1% of product practitioners (Elena Verna, Brian Chesky, Shreyas Doshi, Casey Winters, Julie Zhuo, Sean Ellis, Gibson Biddle). However, accessing and operationalizing these insights is high friction:
  - Over 150+ hours of audio/video content are unsearchable in real-time workflows.
  - General-purpose LLMs hallucinate generic advice rather than citing specific, tested frameworks.
  - Busy product teams need publishable written assets (e.g., Ship 30 for 30 atomic essays) and interactive tools (e.g., PLG calculators, LNO matrices), not just raw chat text.
* **Job to be Done (JTBD)**: *"When I am planning a growth initiative, roadmap review, or strategic post, I want to query Lenny's transcript library for battle-tested playbooks, so that I can make grounded decisions and generate publishable artifacts in seconds without manual transcript digging."*

#### 1.2 Success Metrics
| Metric | Baseline | Target | Evaluation Method |
| :--- | :--- | :--- | :--- |
| **Grounded Answer Precision** | 65% (Vanilla LLM) | **≥ 95%** | Verifiable transcript chunk citation & quote matching |
| **Time-to-Artifact Generation** | 45 minutes (Manual) | **< 8 seconds** | In-app Claude-style artifact rendering speed |
| **Ship 30 for 30 Format Conformance** | Variable | **100%** | 1-Sentence Hook, 1-3-1 cadence, and actionable checklist validation |
| **Sandbox Security Rate** | Untrusted | **100% Isolated** | Strict iframe sandboxing preventing XSS and parent-window access |

#### 1.3 Assumptions
1. **Client Deployment Environment**: Client engineers need both a cloud-managed production path (Gemini/Claude/OpenAI) and an air-gapped/local deployment option (Ollama `llama3.2` / `phi3`) with automatic fallback.
2. **Persistence**: Client operates PostgreSQL/Supabase; the backend must maintain isolated session contexts with clean JSON/Postgres migration path.
3. **Artifact Security**: User-generated or LLM-generated HTML must be treated as untrusted and rendered in an isolated sandbox.

#### 1.4 Scope Boundaries
* **In-Scope (Delivered)**:
  - Hybrid BM25 & Semantic RAG engine over Lenny's Podcast transcript corpus.
  - Multi-session management with independent conversational context.
  - Model toggle with live switching between Cloud (Gemini) and Local (Ollama + local synthesis).
  - Dedicated **Ship 30 for 30 Content Skill** (1-3-1 cadence, ~1,250w structure, actionable takeaways).
  - Split-screen **Artifact Viewer** with live iframe preview, code inspection, and security audit.
  - Complete FDE Handover Suite with live automated test runner and observability logs.
* **Out-of-Scope (Deferred to Phase 2)**:
  - Speech-to-speech audio voice streaming with Lenny's synthetic voice clone.
  - Multi-user RBAC enterprise SSO workspace permissions (can be layered via Supabase Auth).

#### 1.5 Risk & Mitigation Matrix
| Risk Category | Potential Impact | FDE Mitigation Strategy |
| :--- | :--- | :--- |
| **Hallucination** | Low credibility / inaccurate advice | Strict RAG prompt boundaries requiring verbatim source citations + low temperature (0.2). |
| **Ollama Offline** | Broken demo for evaluator | Resilient client-side/server-side fallback to deterministic local synthesis engine. |
| **XSS via Artifacts** | Client security vulnerability | Sandboxed `iframe` without `allow-same-origin` or top-navigation permissions. |
| **Session Bleed** | Data contamination across chats | Distinct UUID session stores with independent message history arrays. |
