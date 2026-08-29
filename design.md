# Design System & UI/UX Principles
## The Lenny Growth Assistant

---

### 1. Visual Identity & Theme
* **Canvas**: Deep Obsidian & Midnight Slate theme (`#090d16` background, `#111827` elevated surfaces, `#1e293b` borders).
* **Accent Palette**: 
  - Royal Podcast Blue (`#3b82f6` / `#2563eb`) - Primary interactions and active states.
  - Emerald Green (`#10b981`) - Grounded citations and verification status.
  - Amber Gold (`#f59e0b`) - Ship 30 for 30 essay markers and writing levers.
  - Violet Indigo (`#8b5cf6`) - Claude-style interactive Artifact badges.
* **Neutral Contrast**: All text elements adhere strictly to WCAG AA contrast standards (> 4.5:1 ratio).

---

### 2. Information Architecture & Spatial System
* **Split-Screen Workbench**:
  - **Left Rail (260px)**: Collapsible Session Drawer with thread histories, quick prompt launchpad, and real-time backend health check indicator.
  - **Center Stage (Flexible 600px–800px)**: Conversational view with message streams, grounded citation pills, and skill action buttons.
  - **Right Panel (Flexible 500px–750px)**: Dedicated Claude-style Artifact Viewer for live interactive tools (e.g., PLG Calculators, LNO boards) and full Ship 30 for 30 essays.
* **Padding Mathematics**:
  - Minimum container padding: 16px to 24px.
  - Button padding: 2x horizontal relative to vertical (e.g. `px-4 py-2`).
  - Corner nesting rule: Child corner radius = Parent corner radius minus container padding.

---

### 3. Key Interaction States
1. **Citation Inspecting**: Clicking any citation badge opens the Citation Drawer showing the exact transcript chunk, episode name, guest, timestamp, and verbatim quote.
2. **Model Switching**: Switching between Gemini and Ollama displays instant provider latency feedback and fallback badges.
3. **Artifact Actions**: One-click Copy Code, Download file (`.html` or `.md`), and Fullscreen preview modes.
4. **Skill Accelerators**: Instant buttons under any answer to convert it into a Ship 30 for 30 essay or interactive growth tool.
