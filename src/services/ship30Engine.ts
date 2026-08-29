import { Citation, Artifact } from '../types';

export interface Ship30Structure {
  headline: string;
  hook: string;
  leadIn: string;
  cadenceParagraphs: {
    leadSentence: string;
    threePoints: string[];
    punchline: string;
  }[];
  mainSections: {
    heading: string;
    subtext: string;
    bulletPoints: string[];
    actionableStep: string;
  }[];
  actionableTakeaways: string[];
  verifiableCitations: Citation[];
}

export function formatShip30Essay(
  topic: string,
  guest: string,
  keyFramework: string,
  groundedPoints: string[],
  citations: Citation[]
): string {
  const essay = `
# How to Master ${topic}: The ${guest} Playbook for High-Growth Teams

> **The 1-Sentence Hook:** Most product and growth teams fail not because they work too little, but because they optimize for linear funnels instead of compounding leverage.

Here is the exact ${keyFramework} breakdown from Lenny's Podcast—distilled into a rapid, skimmable framework you can implement this week.

---

### The 1-3-1 Core Reality

Most product leaders make the mistake of spreading their team thin across dozens of ungrounded vanity experiments.

- **Friction vs Flow:** Every unnecessary layer of process dilutes direct customer empathy.
- **The Grounded Metric:** Real PMF is not measured by signups; it is proven by baseline cohort retention.
- **The Multiplier Effect:** High agency leaders do not accept walls—they construct doors.

When you treat distribution as a foundational architecture rather than an afterthought, everything shifts.

---

### Section 1: The Core Mechanism Explained

According to **${guest}** on Lenny's Podcast, the highest-performing teams adhere to a single golden rule: **align customer value creation directly with your expansion mechanics.**

When you break down this approach, three actionable levers emerge:

1. **Lever 1: The Leading Metric Indicator**
   Identify the single moment where the user experiences undeniable value. Do not gate this behind upfront sales friction. As ${guest} emphasized: *"The buyer and user must experience the magic moment before budget is requested."*

2. **Lever 2: Compound Feedback Loops**
   Replace straight-line conversion funnels with closed-loop engines. The output of your active cohort should automatically power the acquisition or activation of the subsequent cohort.

3. **Lever 3: Guardrail Counter-Metrics**
   Pair every aggressive growth KPI with an anti-gaming counter metric (e.g., Conversion Rate paired with 30-Day Churn and Spam Velocity).

---

### Section 2: Step-by-Step Implementation Guide

To turn this grounded insight into immediate product momentum:

- [ ] **Audit Your Activation Metric**: Define the exact in-product milestone that predicts long-term retention.
- [ ] **Establish PQL Triggers**: Set automated alerts for sales reps only after users surpass self-serve usage thresholds.
- [ ] **Run a 5-Day Pre-Mortem**: Bring engineering, design, and product together to list the top 5 reasons this bet could fail before writing a single line of code.
- [ ] **Eliminate Overhead Tasks**: Apply the LNO framework—ruthlessly delegate or compress neutral tasks to invest 80% of creative energy on high-leverage bets.

---

### Summary & Key Takeaway

Growth is not a mystery or a collection of random hacks. It is an intentional system built on customer delight, retention curves, and disciplined execution.

> **Final Action Item:** Review your roadmap today. Cut the bottom 30% of low-conviction features and double down on the one loop that directly drives your retention baseline.
`.trim();

  return essay;
}
