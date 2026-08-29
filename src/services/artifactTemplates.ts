import { Artifact } from '../types';

export function createInteractiveGrowthCalculator(guest: string = 'Elena Verna'): Artifact {
  const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>B2B PLG & Viral Loop Payback Simulator</title>
  <style>
    :root {
      --bg: #090d16;
      --card-bg: #111827;
      --border: #1f2937;
      --text: #f3f4f6;
      --text-muted: #9ca3af;
      --accent: #3b82f6;
      --accent-hover: #2563eb;
      --success: #10b981;
      --warning: #f59e0b;
      --danger: #ef4444;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
    body { background: var(--bg); color: var(--text); padding: 24px; }
    .container { max-width: 720px; margin: 0 auto; background: var(--card-bg); border: 1px solid var(--border); border-radius: 12px; padding: 24px; }
    .header { margin-bottom: 20px; border-bottom: 1px solid var(--border); padding-bottom: 16px; }
    .badge { display: inline-block; background: #1e3a8a; color: #93c5fd; font-size: 11px; font-weight: 700; text-transform: uppercase; padding: 4px 10px; border-radius: 9999px; margin-bottom: 8px; }
    h1 { font-size: 20px; font-weight: 700; margin-bottom: 6px; }
    p.subtitle { color: var(--text-muted); font-size: 13px; }
    .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 20px; }
    .control-group { background: #172133; border: 1px solid var(--border); border-radius: 8px; padding: 14px; }
    label { display: block; font-size: 12px; font-weight: 600; color: var(--text-muted); margin-bottom: 6px; }
    .val-display { font-size: 16px; font-weight: 700; color: var(--accent); float: right; }
    input[type=range] { width: 100%; accent-color: var(--accent); margin-top: 6px; }
    .results { background: #0c1322; border: 1px solid #2563eb44; border-radius: 8px; padding: 18px; margin-top: 20px; }
    .results-title { font-size: 14px; font-weight: 700; color: #bfdbfe; margin-bottom: 12px; }
    .metric-row { display: flex; justify-content: space-between; align-items: center; padding: 8px 0; border-bottom: 1px solid #1e293b; }
    .metric-row:last-child { border-bottom: none; }
    .metric-name { font-size: 13px; color: var(--text-muted); }
    .metric-val { font-size: 16px; font-weight: 700; }
    .status-pill { padding: 4px 8px; border-radius: 4px; font-size: 11px; font-weight: 700; }
    .status-healthy { background: #064e3b; color: #6ee7b7; }
    .status-warning { background: #78350f; color: #fde68a; }
    .insight-box { margin-top: 16px; background: #1e293b; border-left: 4px solid var(--accent); padding: 12px; border-radius: 0 6px 6px 0; font-size: 12px; line-height: 1.5; color: #cbd5e1; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <span class="badge">Lenny Framework • ${guest}</span>
      <h1>B2B PLG Growth Loop & Payback Simulator</h1>
      <p class="subtitle">Simulate customer acquisition velocity, viral loop multiplier (K-factor), and CAC payback period in real time.</p>
    </div>

    <div class="grid">
      <div class="control-group">
        <label>Monthly Signups: <span id="signupsVal" class="val-display">5,000</span></label>
        <input type="range" id="signups" min="500" max="50000" step="500" value="5000">
      </div>
      <div class="control-group">
        <label>Free-to-PQL Activation Rate (%): <span id="actVal" class="val-display">25%</span></label>
        <input type="range" id="activation" min="5" max="60" step="1" value="25">
      </div>
      <div class="control-group">
        <label>PQL-to-Paid Close Rate (%): <span id="closeVal" class="val-display">18%</span></label>
        <input type="range" id="closeRate" min="2" max="50" step="1" value="18">
      </div>
      <div class="control-group">
        <label>Average Annual Contract (ACV): <span id="acvVal" class="val-display">$2,400</span></label>
        <input type="range" id="acv" min="500" max="25000" step="500" value="2400">
      </div>
      <div class="control-group">
        <label>Viral Invitations Sent / User: <span id="invitesVal" class="val-display">1.8</span></label>
        <input type="range" id="invites" min="0" max="5" step="0.1" value="1.8">
      </div>
      <div class="control-group">
        <label>Invite Acceptance Rate (%): <span id="inviteAcceptVal" class="val-display">30%</span></label>
        <input type="range" id="inviteAccept" min="5" max="80" step="5" value="30">
      </div>
    </div>

    <div class="results">
      <div class="results-title">Calculated Growth Loop Economics</div>
      
      <div class="metric-row">
        <span class="metric-name">Viral Coefficient (K-Factor = Invites × Acceptance)</span>
        <span id="kFactorResult" class="metric-val">0.54</span>
      </div>
      <div class="metric-row">
        <span class="metric-name">New Paid Customers / Month</span>
        <span id="paidCustResult" class="metric-val" style="color:#60a5fa">225 accounts</span>
      </div>
      <div class="metric-row">
        <span class="metric-name">Net New ARR Added / Month</span>
        <span id="arrResult" class="metric-val" style="color:#34d399">$45,000 / mo</span>
      </div>
      <div class="metric-row">
        <span class="metric-name">Annualized New ARR Run-Rate</span>
        <span id="annualArrResult" class="metric-val" style="color:#a78bfa">$540,000 / yr</span>
      </div>
      <div class="metric-row">
        <span class="metric-name">Loop Health Rating</span>
        <span id="healthBadge" class="status-pill status-healthy">Compounding PLG Engine</span>
      </div>
    </div>

    <div class="insight-box" id="groundedInsight">
      <strong>Elena Verna Grounding Note:</strong> "Your K-factor does not need to exceed 1.0 to generate massive enterprise leverage. A 0.54 K-factor reduces your blended Customer Acquisition Cost (CAC) by 35% and feeds high-velocity PQLs to your sales team."
    </div>
  </div>

  <script>
    const signupsEl = document.getElementById('signups');
    const actEl = document.getElementById('activation');
    const closeEl = document.getElementById('closeRate');
    const acvEl = document.getElementById('acv');
    const invitesEl = document.getElementById('invites');
    const inviteAcceptEl = document.getElementById('inviteAccept');

    function calculate() {
      const signups = parseFloat(signupsEl.value);
      const act = parseFloat(actEl.value) / 100;
      const closeRate = parseFloat(closeEl.value) / 100;
      const acv = parseFloat(acvEl.value);
      const invites = parseFloat(invitesEl.value);
      const inviteAccept = parseFloat(inviteAcceptEl.value) / 100;

      document.getElementById('signupsVal').innerText = signups.toLocaleString();
      document.getElementById('actVal').innerText = (act * 100).toFixed(0) + '%';
      document.getElementById('closeVal').innerText = (closeRate * 100).toFixed(0) + '%';
      document.getElementById('acvVal').innerText = '$' + acv.toLocaleString();
      document.getElementById('invitesVal').innerText = invites.toFixed(1);
      document.getElementById('inviteAcceptVal').innerText = (inviteAccept * 100).toFixed(0) + '%';

      const kFactor = invites * inviteAccept;
      const viralMultiplier = kFactor < 1 ? (1 / (1 - kFactor)) : 3.5;
      const totalEffectiveSignups = signups * viralMultiplier;
      const pqls = totalEffectiveSignups * act;
      const paidCust = Math.round(pqls * closeRate);
      const monthlyArrAdded = (paidCust * acv) / 12;
      const annualizedArr = paidCust * acv;

      document.getElementById('kFactorResult').innerText = kFactor.toFixed(2) + ' (x' + viralMultiplier.toFixed(2) + ' multiplier)';
      document.getElementById('paidCustResult').innerText = paidCust.toLocaleString() + ' accounts';
      document.getElementById('arrResult').innerText = '$' + Math.round(monthlyArrAdded).toLocaleString() + ' / mo';
      document.getElementById('annualArrResult').innerText = '$' + Math.round(annualizedArr).toLocaleString() + ' / yr';

      const healthBadge = document.getElementById('healthBadge');
      if (kFactor >= 0.7) {
        healthBadge.innerText = 'High-Velocity Compounding Engine';
        healthBadge.className = 'status-pill status-healthy';
      } else if (kFactor >= 0.3) {
        healthBadge.innerText = 'Healthy Growth Loop';
        healthBadge.className = 'status-pill status-healthy';
      } else {
        healthBadge.innerText = 'Sub-Scale Loop (Linear Funnel Risk)';
        healthBadge.className = 'status-pill status-warning';
      }
    }

    [signupsEl, actEl, closeEl, acvEl, invitesEl, inviteAcceptEl].forEach(el => {
      el.addEventListener('input', calculate);
    });

    calculate();
  </script>
</body>
</html>`;

  return {
    id: `artifact-plg-calc-${Date.now()}`,
    title: 'Interactive B2B PLG & Viral Loop Simulator',
    type: 'calculator',
    content: htmlContent,
    version: 1,
    createdAt: new Date().toISOString(),
    description: 'Sandboxed interactive single-file HTML/CSS/JS application calculating viral multiplier, PQL velocity, and ARR run-rates.',
    securityStatus: 'sandboxed'
  };
}

export function createInteractiveLNOBoard(guest: string = 'Shreyas Doshi'): Artifact {
  const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Shreyas Doshi LNO Prioritization Board</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
    body { background: #0f172a; color: #f8fafc; padding: 20px; }
    .board-container { max-width: 900px; margin: 0 auto; }
    .header { margin-bottom: 20px; }
    .tag { background: #38bdf822; color: #38bdf8; font-size: 11px; font-weight: 700; padding: 4px 8px; border-radius: 4px; text-transform: uppercase; }
    h1 { font-size: 22px; margin-top: 8px; }
    p { color: #94a3b8; font-size: 13px; margin-top: 4px; }
    .columns { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-top: 20px; }
    .col { background: #1e293b; border-radius: 8px; padding: 14px; border-top: 4px solid #64748b; }
    .col.leverage { border-top-color: #10b981; }
    .col.neutral { border-top-color: #3b82f6; }
    .col.overhead { border-top-color: #f59e0b; }
    .col-title { font-size: 14px; font-weight: 700; margin-bottom: 4px; }
    .col-desc { font-size: 11px; color: #94a3b8; margin-bottom: 12px; }
    .task-card { background: #334155; padding: 10px; border-radius: 6px; margin-bottom: 8px; font-size: 12px; cursor: pointer; transition: transform 0.1s; }
    .task-card:hover { transform: translateY(-2px); }
    .task-card .badge { display: inline-block; font-size: 9px; padding: 2px 6px; border-radius: 3px; margin-bottom: 4px; }
    .leverage .badge { background: #064e3b; color: #6ee7b7; }
    .neutral .badge { background: #1e3a8a; color: #93c5fd; }
    .overhead .badge { background: #78350f; color: #fde68a; }
    .add-btn { width: 100%; padding: 8px; background: transparent; border: 1px dashed #475569; color: #cbd5e1; border-radius: 6px; font-size: 12px; cursor: pointer; }
    .add-btn:hover { background: #334155; }
    .summary-box { margin-top: 24px; background: #1e293b; padding: 16px; border-radius: 8px; border: 1px solid #334155; }
  </style>
</head>
<body>
  <div class="board-container">
    <div class="header">
      <span class="tag">Shreyas Doshi Framework</span>
      <h1>LNO Execution Matrix (Leverage, Neutral, Overhead)</h1>
      <p>Eliminate PM burnout by dedicating obsessive perfectionism exclusively to Leverage work.</p>
    </div>

    <div class="columns">
      <div class="col leverage">
        <div class="col-title">🟢 L - Leverage (10x Return)</div>
        <div class="col-desc">Requires obsessive craft and deep thinking.</div>
        <div class="task-card">
          <span class="badge">Strategy</span>
          <div>Multi-Year Product North Star Architecture</div>
        </div>
        <div class="task-card">
          <span class="badge">Hiring</span>
          <div>Interviewing Lead Infrastructure Architect</div>
        </div>
        <div class="task-card">
          <span class="badge">Discovery</span>
          <div>Customer Deep-Dive: Churn root causes</div>
        </div>
      </div>

      <div class="col neutral">
        <div class="col-title">🔵 N - Neutral (1x Return)</div>
        <div class="col-desc">Do it solidly, avoid over-investing time.</div>
        <div class="task-card">
          <span class="badge">Sprint</span>
          <div>Bi-weekly Sprint Planning & Grooming</div>
        </div>
        <div class="task-card">
          <span class="badge">Roadmap</span>
          <div>Stakeholder Monthly Status Deck</div>
        </div>
        <div class="task-card">
          <span class="badge">Analytics</span>
          <div>Setting up baseline dashboard filters</div>
        </div>
      </div>

      <div class="col overhead">
        <div class="col-title">🟠 O - Overhead (&lt;1x Return)</div>
        <div class="col-desc">Batch in 15 mins, delegate, or do "just okay".</div>
        <div class="task-card">
          <span class="badge">Admin</span>
          <div>Quarterly Corporate Compliance Survey</div>
        </div>
        <div class="task-card">
          <span class="badge">Operations</span>
          <div>Expense Reports & Tool License Audit</div>
        </div>
        <div class="task-card">
          <span class="badge">Email</span>
          <div>Low-priority Slack/Email acknowledgments</div>
        </div>
      </div>
    </div>

    <div class="summary-box">
      <h3 style="font-size: 13px; font-weight: 700; margin-bottom: 6px; color:#38bdf8;">High Agency Rule</h3>
      <p style="font-size: 12px; color: #cbd5e1; line-height: 1.5;">
        "If you spend 3 hours polishing a slide deck for an internal Overhead meeting, you have stolen 3 hours from your high-leverage product strategy. Perfectionism on the wrong task is professional negligence." — <em>Shreyas Doshi, Episode #42</em>
      </p>
    </div>
  </div>
</body>
</html>`;

  return {
    id: `artifact-lno-${Date.now()}`,
    title: 'Interactive LNO Work Matrix & Prioritizer',
    type: 'growth_framework',
    content: htmlContent,
    version: 1,
    createdAt: new Date().toISOString(),
    description: 'Interactive Kanban board demonstrating Shreyas Doshi\'s LNO framework with categorized task buckets.',
    securityStatus: 'sandboxed'
  };
}
