import { TranscriptEpisode, TranscriptChunk, SearchResult } from '../types';

export const LENNY_EPISODES: TranscriptEpisode[] = [
  {
    id: 'elena-verna-plg',
    episodeNumber: 84,
    title: 'The Ultimate Guide to B2B Product-Led Growth and Product-Led Sales',
    guest: 'Elena Verna',
    guestRole: 'Head of Growth at Amplitude, Interim CMO at Miro, Advisor at Dropbox',
    company: 'Amplitude / Miro / Dropbox',
    duration: '1h 14m',
    publishedDate: '2023-04-18',
    summary: 'Elena Verna breaks down why PLG is a go-to-market motion, not a product feature, how to transition from sales-led to product-led, monetization loops, and the product-led sales hybrid model.',
    topics: ['PLG', 'Product-Led Sales', 'Monetization', 'B2B Growth', 'Activation', 'Retention', 'Pricing'],
    popularQuote: 'PLG is not a product strategy; it is a distribution strategy. If your product does not acquire, retain, and monetize users on its own, adding a free trial will not save you.',
    keyTakeaways: [
      'PLG is a go-to-market distribution model, not just a freemium button.',
      'You need 3 distinct loops: Acquisition Loop, Retention Loop, and Monetization Loop.',
      'Product-Led Sales (PLS) works best when sales reps reach out only to users who already demonstrated high Product Qualified Lead (PQL) velocity.',
      'Usage paywalls beat feature paywalls for self-serve expansion.'
    ],
    chunks: [
      {
        id: 'ev-1',
        episodeId: 'elena-verna-plg',
        episodeNumber: 84,
        guest: 'Elena Verna',
        guestRole: 'Head of Growth at Amplitude & Miro Advisor',
        episodeTitle: 'The Ultimate Guide to B2B PLG and Product-Led Sales',
        timestamp: '04:15 - 08:30',
        timestampSeconds: 255,
        tags: ['PLG Definition', 'Distribution', 'GTM'],
        keyTakeaway: 'PLG is a distribution strategy centered on the end-user experiencing value before paying.',
        content: `Lenny: Elena, so many founders tell me "We are building PLG into our roadmap next quarter." What is the biggest misconception about Product-Led Growth?
Elena Verna: The #1 misconception is treating PLG as a product feature or a UI redesign. Founders say, "Let's put a sign-up button on the home page and make a 14-day free trial." That is not PLG. PLG is an entire Go-To-Market distribution model. In traditional Sales-Led Growth (SLG), marketing buys leads, sales closes buyers, and customer success teaches users. In PLG, the product itself is the primary vehicle to acquire, activate, retain, and monetize users. The buyer and the user are often decoupled: the end-user falls in love with the tool first, gets value immediately without talking to a human, and then pulls budget up through the organization.`
      },
      {
        id: 'ev-2',
        episodeId: 'elena-verna-plg',
        episodeNumber: 84,
        guest: 'Elena Verna',
        guestRole: 'Head of Growth at Amplitude & Miro Advisor',
        episodeTitle: 'The Ultimate Guide to B2B PLG and Product-Led Sales',
        timestamp: '15:20 - 20:45',
        timestampSeconds: 920,
        tags: ['PQL', 'Product-Led Sales', 'Enterprise Expansion'],
        keyTakeaway: 'Product Qualified Leads (PQLs) must be based on user activation velocity, not just seat counts.',
        content: `Lenny: How should teams think about Product-Led Sales (PLS) versus pure self-serve?
Elena Verna: Pure self-serve hits an ARR ceiling around $20M to $50M in B2B unless you add enterprise sales. But you should NEVER give sales cold leads. Instead, you define a Product Qualified Lead (PQL). A PQL is triggered when a company account hits specific in-product activation milestones—for example, when 5 users in a domain create 10 collaborative boards in 7 days. At that point, a sales rep doesn't say "Hey do you want a demo?" They say "Hey, I see your design team at Figma has created 10 active boards and is hitting the workspace security limit. Let me help you set up SSO and enterprise admin controls." That conversation has an 80% close rate because the value is already realized.`
      },
      {
        id: 'ev-3',
        episodeId: 'elena-verna-plg',
        episodeNumber: 84,
        guest: 'Elena Verna',
        guestRole: 'Head of Growth at Amplitude & Miro Advisor',
        episodeTitle: 'The Ultimate Guide to B2B PLG and Product-Led Sales',
        timestamp: '32:10 - 37:50',
        timestampSeconds: 1930,
        tags: ['Monetization Loops', 'Pricing', 'Paywalls'],
        keyTakeaway: 'Feature paywalls create friction; usage paywalls scale with customer value creation.',
        content: `Elena Verna: When structuring your monetization loops, avoid putting your best features behind an upfront paywall. If a user cannot experience the magic moment in their first session, they churn. Put the paywall on volume, frequency, or team collaboration. Look at Miro: you get 3 editable boards for free forever. You can experience the full power of Miro. But as soon as you want a 4th board or want to invite your department, you hit the natural expansion paywall. That is how you align monetization with customer value creation.`
      }
    ]
  },
  {
    id: 'brian-chesky-founder-mode',
    episodeNumber: 152,
    title: 'Brian Chesky on Founder Mode, Ending Traditional PM, and Rebuilding Airbnb',
    guest: 'Brian Chesky',
    guestRole: 'Co-founder & CEO at Airbnb',
    company: 'Airbnb',
    duration: '1h 38m',
    publishedDate: '2023-11-09',
    summary: 'Brian Chesky shares why Airbnb eliminated traditional siloed Product Managers in favor of Product Marketers and designers, the concept of Founder Mode, running a unified product roadmap, and obsessive attention to detail.',
    topics: ['Founder Mode', 'Product Management', 'Organizational Design', 'Roadmaps', 'Airbnb', 'Design-Led PM'],
    popularQuote: 'We were told to hire professional managers, delegate, and stay at 30,000 feet. It was a disaster. Great founders must be in the details—curating the product review every week.',
    keyTakeaways: [
      'Delegation without verification breeds bureaucratic mediocrity in product organizations.',
      'Combined Product Marketing + Product Management role ensures the builder understands how the product is sold and positioned.',
      'One single shared company-wide roadmap reviewed weekly prevents duplicated efforts and feature bloat.',
      'Great products come from obsessing over the end-to-end customer journey map.'
    ],
    chunks: [
      {
        id: 'bc-1',
        episodeId: 'brian-chesky-founder-mode',
        episodeNumber: 152,
        guest: 'Brian Chesky',
        guestRole: 'Co-founder & CEO at Airbnb',
        episodeTitle: 'Brian Chesky on Founder Mode and Rebuilding Airbnb',
        timestamp: '09:00 - 14:20',
        timestampSeconds: 540,
        tags: ['Founder Mode', 'Management', 'Product Review'],
        keyTakeaway: 'Founder Mode means being in the details, running shared reviews, and holding a unified product vision.',
        content: `Lenny: Brian, your comment about "Founder Mode" set the tech world on fire. What does it actually mean day-to-day at Airbnb?
Brian Chesky: In Silicon Valley, founders were taught: "Hire professional managers, give them autonomous OKRs, don't micromanage, stay out of the details." We did that, and our product became fragmented, bloated, and slow. In 2020 during the pandemic, I took back the product. Founder Mode does NOT mean micromanaging every line of code. It means: 1) You run one shared company roadmap, not 50 disconnected divisional roadmaps. 2) Every single feature that ships to customers goes through a product review with leadership. 3) You inspect what you expect. If a design looks off by 2 pixels, you ask why. When leaders show they care about craft, the entire organization lifts its standards.`
      },
      {
        id: 'bc-2',
        episodeId: 'brian-chesky-founder-mode',
        episodeNumber: 152,
        guest: 'Brian Chesky',
        guestRole: 'Co-founder & CEO at Airbnb',
        episodeTitle: 'Brian Chesky on Founder Mode and Rebuilding Airbnb',
        timestamp: '22:15 - 28:00',
        timestampSeconds: 1335,
        tags: ['Product Management Role', 'Product Marketing', 'Silos'],
        keyTakeaway: 'Airbnb replaced classical PMs with Product Marketers who own building, pricing, and narrative.',
        content: `Lenny: You made headlines when you said you "got rid of the classic product management function." What did you replace it with?
Brian Chesky: We didn't eliminate the work; we combined Product Management with Product Marketing, modeled after Apple. Classic PMs had become mini-administrators who wrote tickets in Jira and pushed schedules. But they didn't understand the customer story or how to market the product. Now, our Product Marketing Managers (PMMs) have to answer: "What is the customer problem? What is the narrative? How will we tell the world in our Summer/Winter Release?" If you cannot explain the value of a feature in a 30-second keynote demo, it is probably too complicated to build in the first place.`
      }
    ]
  },
  {
    id: 'shreyas-doshi-high-agency',
    episodeNumber: 42,
    title: 'High Agency PMing, The LNO Framework, and Escaping the Impact vs Effort Trap',
    guest: 'Shreyas Doshi',
    guestRole: 'Former Product Lead at Stripe, Twitter, Google, Yahoo',
    company: 'Stripe / Google',
    duration: '1h 22m',
    publishedDate: '2022-10-06',
    summary: 'Shreyas Doshi introduces actionable product frameworks including High Agency leadership, the LNO (Leverage, Neutral, Overhead) time management framework, why Impact vs Effort matrices fail, and pre-mortems.',
    topics: ['High Agency', 'LNO Framework', 'Prioritization', 'Product Strategy', 'Product Management Career'],
    popularQuote: 'High agency is the ability to bend reality to your will. When ordinary people hit a wall, they stop and file a ticket. High agency people find a ladder, dig a tunnel, or build a door.',
    keyTakeaways: [
      'The LNO Framework categorizes work into Leverage (10x return), Neutral (1x return), and Overhead (<1x return).',
      'The Impact vs Effort matrix fails because PMs consistently overestimate impact and underestimate effort.',
      'High Agency is the #1 predictor of top-tier product executive performance.',
      'Conduct pre-mortems before writing PRDs to expose silent failure modes.'
    ],
    chunks: [
      {
        id: 'sd-1',
        episodeId: 'shreyas-doshi-high-agency',
        episodeNumber: 42,
        guest: 'Shreyas Doshi',
        guestRole: 'Former Product Lead at Stripe & Twitter',
        episodeTitle: 'High Agency PMing and The LNO Framework',
        timestamp: '11:30 - 17:15',
        timestampSeconds: 690,
        tags: ['LNO Framework', 'Time Management', 'Leverage'],
        keyTakeaway: 'Apply perfection only to Leverage tasks; do Neutral tasks well enough; do Overhead tasks with minimal time.',
        content: `Lenny: Shreyas, your LNO Framework is used by thousands of PMs. Can you explain the core concept?
Shreyas Doshi: Most PMs suffer from burnout because they try to do ALL tasks with 100% excellence. That is a fatal mistake. You must classify every task into three buckets:
1. L (Leverage): Tasks where 10x effort yields 100x outcome. Examples: Defining the multi-year product strategy, hiring your lead engineer, or writing the core architecture PRD. Here, obsessive perfectionism is required.
2. N (Neutral): Tasks where 1x effort yields 1x outcome. Examples: Weekly sprint planning, status updates, roadmap hygiene. Do these solidly and move on.
3. O (Overhead): Tasks where quality doesn't move the needle. Examples: Submitting expense reports, filling standard corporate surveys, non-critical email replies. Do them quickly, imperfectly, or batch them in 15 minutes on Friday afternoon.
If you treat an Overhead task like a Leverage task, you starve your true Leverage projects of intellectual energy.`
      },
      {
        id: 'sd-2',
        episodeId: 'shreyas-doshi-high-agency',
        episodeNumber: 42,
        guest: 'Shreyas Doshi',
        guestRole: 'Former Product Lead at Stripe & Twitter',
        episodeTitle: 'High Agency PMing and The LNO Framework',
        timestamp: '28:40 - 34:10',
        timestampSeconds: 1720,
        tags: ['Prioritization', 'Impact vs Effort Trap', 'Strategy'],
        keyTakeaway: 'The 2x2 Impact vs Effort matrix creates false precision because humans are systematically biased estimators.',
        content: `Lenny: Why do you dislike the classic 2x2 Impact vs. Effort matrix?
Shreyas Doshi: Because it gives a false illusion of mathematical objectivity. PMs put 20 sticky notes on a grid: "High Impact, Low Effort." But in reality, humans have two cognitive biases: 1) We dramatically overestimate the impact of our own pet ideas. 2) We dramatically underestimate the hidden engineering complexity (tech debt, edge cases, cross-platform QA). As a result, teams end up prioritizing trivial "low-hanging fruit" features that produce zero enduring strategic advantage. Instead, prioritize by strategic conviction, customer misery alleviation, and core differentiated value propositions.`
      }
    ]
  },
  {
    id: 'casey-winters-growth-loops',
    episodeNumber: 67,
    title: 'Growth Loops vs. Funnels, Retention Mechanics, and Scaling Grubhub & Pinterest',
    guest: 'Casey Winters',
    guestRole: 'Former CPO at Eventbrite, Growth Lead at Pinterest and Grubhub, Partner at Reforge',
    company: 'Pinterest / Grubhub / Reforge',
    duration: '1h 08m',
    publishedDate: '2023-01-24',
    summary: 'Casey Winters explains why top companies build compounding growth loops rather than straight-line acquisition funnels, how to diagnose retention cliffs, and loop sustainability.',
    topics: ['Growth Loops', 'Retention', 'SEO Loops', 'Virality', 'Reforge', 'Unit Economics'],
    popularQuote: 'Funnels produce linear returns that stop the moment you turn off ad spend. Loops produce reinvestment cycles where one cohort of users directly generates the next cohort.',
    keyTakeaways: [
      'Growth Loops are closed systems where output from one step becomes input for the next.',
      'Types of loops: Viral Loop (user invites user), Content/SEO Loop (user creates content indexed by Google), Paid Loop (LTV reinvested into CAC).',
      'Retention is the foundation of growth: a leaky bucket makes loops mathematically impossible to sustain.',
      'Measure habit loops: Trigger -> Action -> Reward -> Investment.'
    ],
    chunks: [
      {
        id: 'cw-1',
        episodeId: 'casey-winters-growth-loops',
        episodeNumber: 67,
        guest: 'Casey Winters',
        guestRole: 'Former CPO at Eventbrite & Growth Lead at Pinterest',
        episodeTitle: 'Growth Loops vs. Funnels and Retention Mechanics',
        timestamp: '07:30 - 13:10',
        timestampSeconds: 450,
        tags: ['Growth Loops', 'Compounding', 'Funnels'],
        keyTakeaway: 'Funnels lose energy at every stage; loops reinvest user actions into sustainable compound acquisition.',
        content: `Lenny: Casey, you pioneered Growth Loops at Reforge and Pinterest. Why should PMs stop thinking in terms of traditional AARRR Pirate funnels?
Casey Winters: Traditional funnels (Acquisition -> Activation -> Retention -> Referral -> Revenue) treat growth like a straight pipe. You pour money or traffic into the top, 90% leaks out, and the 10% that converts produces zero forward momentum for the next cohort. You have to pour more money tomorrow just to stay flat.
Growth Loops, in contrast, are circular compounding engines. 
Look at Pinterest:
1. New user signs up and saves a recipe Pin (Action).
2. Pinterest packages that Pin as a public web page with rich structured metadata (Asset creation).
3. Search engines like Google index the page (Distribution).
4. A new prospective user searches for "dinner recipes" on Google, clicks the Pinterest link, and signs up (New User Acquisition).
The output of user 1 becomes the direct acquisition engine for user 2. That is compounding growth.`
      },
      {
        id: 'cw-2',
        episodeId: 'casey-winters-growth-loops',
        episodeNumber: 67,
        guest: 'Casey Winters',
        guestRole: 'Former CPO at Eventbrite & Growth Lead at Pinterest',
        episodeTitle: 'Growth Loops vs. Funnels and Retention Mechanics',
        timestamp: '25:00 - 30:40',
        timestampSeconds: 1500,
        tags: ['Retention Curves', 'Churn', 'PMF Diagnosis'],
        keyTakeaway: 'A retention curve must flatten parallel to the x-axis; downward sloping curves indicate lack of product-market fit.',
        content: `Casey Winters: Before you spend a single dollar optimizing top-of-funnel acquisition, look at your cohort retention curve. Plot percentage of active users on the y-axis against time (Days/Weeks/Months) on the x-axis. If the line continues downward toward zero, you do NOT have product-market fit. Adding more users to a leaky bucket burns cash. But if the retention curve bends and flattens out asymptotically—say at 25% or 40%—you have a viable core. Every new cohort stacks on top of the retained base, creating predictable baseline ARR growth.`
      }
    ]
  },
  {
    id: 'julie-zhuo-metrics',
    episodeNumber: 95,
    title: 'Designing Metrics That Matter: North Stars, Counter-Metrics, and Product Sense',
    guest: 'Julie Zhuo',
    guestRole: 'Former VP of Product Design at Facebook, Co-founder of Sundial, Author of The Making of a Manager',
    company: 'Facebook / Sundial',
    duration: '1h 05m',
    publishedDate: '2023-06-12',
    summary: 'Julie Zhuo details how to select meaningful North Star metrics without creating perverse incentives, balancing qualitative design with quantitative dashboards, and setting up counter-metrics.',
    topics: ['North Star Metric', 'Counter Metrics', 'Product Sense', 'Product Design', 'Analytics'],
    popularQuote: 'A single metric without counter-metrics is dangerous. If you only optimize for clicks, you end up shipping clickbait and destroying brand trust.',
    keyTakeaways: [
      'North Star Metric must measure real customer value delivered, not just company revenue extracted.',
      'Every primary metric must have a paired Counter-Metric (e.g., Conversion Rate paired with Unsubscribe Rate).',
      'Great product sense is empathy structured through data, not guessing in a vacuum.',
      'Input metrics (things the team can control weekly) drive lagging output metrics.'
    ],
    chunks: [
      {
        id: 'jz-1',
        episodeId: 'julie-zhuo-metrics',
        episodeNumber: 95,
        guest: 'Julie Zhuo',
        guestRole: 'Former VP Product Design at Facebook & Co-founder of Sundial',
        episodeTitle: 'Designing Metrics That Matter: North Stars and Counter-Metrics',
        timestamp: '08:45 - 14:00',
        timestampSeconds: 525,
        tags: ['North Star Metric', 'Guardrail Metrics', 'Data Strategy'],
        keyTakeaway: 'Always pair primary optimization metrics with guardrail counter-metrics to prevent gaming.',
        content: `Lenny: Julie, what is the most common mistake teams make when defining their North Star Metric?
Julie Zhuo: The biggest mistake is choosing a vanity metric or an extraction metric like total revenue or total page views. A true North Star metric should measure the exact moment customer value is delivered. For Airbnb, it's not searches—it's "Nights Booked." For Slack, it's "Teams sending 2,000+ messages."
And crucially, you must never track a North Star in isolation. You must pair it with Counter-Metrics or Guardrails. If your goal is to increase signups by 30%, your counter-metric is 30-day active retention and spam rate. If signups go up but Day-30 retention crashes, your experiment failed. Counter-metrics keep the organization honest and protect the long-term health of the ecosystem.`
      }
    ]
  },
  {
    id: 'gustaf-alstromer-yc-growth',
    episodeNumber: 110,
    title: 'The Y Combinator Guide to Early-Stage Growth and Finding Product-Market Fit',
    guest: 'Gustaf Alströmer',
    guestRole: 'Group Partner at Y Combinator, Former Head of Growth at Airbnb',
    company: 'Y Combinator / Airbnb',
    duration: '1h 12m',
    publishedDate: '2023-08-30',
    summary: 'Gustaf Alströmer explains the YC growth framework, how to calculate weekly growth rates, why retention is the only true test of PMF, and how to do things that don\'t scale early on.',
    topics: ['YC Growth', 'Early Stage PMF', 'Weekly Growth Rate', 'Retention', 'Airbnb Early Days'],
    popularQuote: 'If your retention is bad, nothing else matters. Growth is just a multiplier on retention. 10x of zero retained users is still zero.',
    keyTakeaways: [
      'YC target: 5% to 7% weekly growth during the batch if retention is proven.',
      'Talk to 10 users every single week directly; do not hide behind analytics tools in the early stage.',
      'Manual onboarding (concierge MVP) reveals friction points 10x faster than automated A/B tests.',
      'Separate top-of-funnel noise from actual engaged cohort retention.'
    ],
    chunks: [
      {
        id: 'ga-1',
        episodeId: 'gustaf-alstromer-yc-growth',
        episodeNumber: 110,
        guest: 'Gustaf Alströmer',
        guestRole: 'Group Partner at Y Combinator & Former Head of Growth at Airbnb',
        episodeTitle: 'The YC Guide to Early-Stage Growth and Finding PMF',
        timestamp: '12:10 - 17:35',
        timestampSeconds: 730,
        tags: ['Retention', 'PMF', 'Early Stage Growth'],
        keyTakeaway: 'Retention is the foundational prerequisite before scaling growth experiments.',
        content: `Lenny: Gustaf, after seeing hundreds of YC startups, what separates founders who find PMF from those who stall?
Gustaf Alströmer: The founders who succeed obsess over retention cohorts before acquisition. In the first year, acquisition is easy to fake: you can run Google ads, buy influencers, or post on Product Hunt and get 1,000 signups. But if week-4 retention is 2%, you have built nothing of enduring value.
At YC, we tell founders: Find 10 users who love your product so much they would scream if you took it away. Onboard them manually over Zoom. Watch where they get stuck. Fix their bugs within 2 hours. When those 10 users keep coming back week after week without reminders, that is the seed of Product-Market Fit.`
      }
    ]
  },
  {
    id: 'sean-ellis-pmf-survey',
    episodeNumber: 58,
    title: 'The PMF Survey, Growth Hacking Origins, and Running Rapid Experimentation',
    guest: 'Sean Ellis',
    guestRole: 'Author of Hacking Growth, Co-founder of Qualaroo, Former Growth Lead at Dropbox and Eventbrite',
    company: 'Dropbox / LogMeIn',
    duration: '1h 10m',
    publishedDate: '2022-12-15',
    summary: 'Sean Ellis discusses the 40% "Very Disappointed" Product-Market Fit survey benchmark, the ICE prioritization framework (Impact, Confidence, Ease), and running high-cadence growth sprints.',
    topics: ['PMF Survey', 'ICE Framework', 'Growth Sprints', 'Experimentation Cadence', 'Dropbox Growth'],
    popularQuote: 'If more than 40% of surveyed users say they would be "very disappointed" without your product, you have achieved Product-Market Fit.',
    keyTakeaways: [
      'The 40% "Very Disappointed" benchmark is the single most validated leading indicator of PMF.',
      'ICE Prioritization score = (Impact + Confidence + Ease) / 3 to rank growth backlog items.',
      'High growth teams run 3-5 controlled experiments per week, compounding marginal gains.',
      'Double down on the core benefit described by your "very disappointed" user cohort.'
    ],
    chunks: [
      {
        id: 'se-1',
        episodeId: 'sean-ellis-pmf-survey',
        episodeNumber: 58,
        guest: 'Sean Ellis',
        guestRole: 'Author of Hacking Growth & Growth Pioneer at Dropbox',
        episodeTitle: 'The PMF Survey and Running Rapid Experimentation',
        timestamp: '09:20 - 15:40',
        timestampSeconds: 560,
        tags: ['PMF Survey', '40% Rule', 'ICE Scoring'],
        keyTakeaway: 'The 40% very disappointed rule provides a quantifiable leading indicator of Product-Market Fit.',
        content: `Lenny: Sean, how did you come up with the famous 40% PMF survey question?
Sean Ellis: When I was leading growth at Dropbox and LogMeIn, founders would ask: "Are we ready to hire a growth team and spend money on acquisition?" I needed a quantitative leading indicator before waiting 6 months for cohort data.
So I asked users who had experienced the core product at least twice in the past 2 weeks:
"How would you feel if you could no longer use this product?"
1) Very disappointed
2) Somewhat disappointed
3) Not disappointed (it isn't really that useful)
4) N/A - I no longer use it.
Across hundreds of companies, products that struggled to grow were always under 40% "very disappointed". Products with runaway organic word-of-mouth (like Superhuman, Slack, Dropbox) consistently surpassed 40%. Once you cross 40%, you analyze the exact words the "very disappointed" users use to describe the main benefit, and build your entire marketing narrative and onboarding around that singular hook.`
      }
    ]
  },
  {
    id: 'gibson-biddle-dhm-model',
    episodeNumber: 73,
    title: 'The DHM Model, Strategy Sprints, and How Netflix Built a Moat',
    guest: 'Gibson Biddle',
    guestRole: 'Former VP of Product at Netflix and Chief Product Officer at Chegg',
    company: 'Netflix / Chegg',
    duration: '1h 16m',
    publishedDate: '2023-03-02',
    summary: 'Gibson Biddle breaks down Netflix\'s DHM Model (Delight customers, Hard to copy, Margin-enhancing), the GEM framework, proxy metrics, and consumer product strategy.',
    topics: ['DHM Model', 'Product Strategy', 'Netflix', 'Moats', 'Proxy Metrics'],
    popularQuote: 'Product strategy is about answering: How will your product Delight customers, in ways that are Hard to copy, while being Margin-enhancing?',
    keyTakeaways: [
      'The DHM Model: Delight + Hard to Copy + Margin Enhancing.',
      '7 Moat Archetypes: Brand, Network Effects, Economies of Scale, Counter-positioning, Switching Costs, Unique Tech, Process Power.',
      'Proxy Metrics turn abstract strategic bets into measurable daily KPIs.',
      'Margin enhancement funds future customer delight.'
    ],
    chunks: [
      {
        id: 'gb-1',
        episodeId: 'gibson-biddle-dhm-model',
        episodeNumber: 73,
        guest: 'Gibson Biddle',
        guestRole: 'Former VP of Product at Netflix',
        episodeTitle: 'The DHM Model and How Netflix Built a Moat',
        timestamp: '10:00 - 16:30',
        timestampSeconds: 600,
        tags: ['DHM Model', 'Product Strategy', 'Competitive Advantage'],
        keyTakeaway: 'Every product roadmap initiative must balance Delight, Moat (Hard to Copy), and Margin.',
        content: `Lenny: Gib, your DHM Model is legendary in product strategy courses. How does it guide day-to-day product roadmaps?
Gibson Biddle: Product strategy boils down to three simple letters: D-H-M.
1. Delight: How does this feature bring genuine joy and solve a painful customer problem? (e.g., Netflix personalized recommendations or instant streaming playback).
2. Hard to Copy: How does it create a durable moat that competitors cannot easily clone? (e.g., Netflix's proprietary recommendation algorithm and multi-billion dollar original content library).
3. Margin Enhancing: How does it generate profit or reduce operational cost so you can reinvest in delighting customers further? (e.g., shifting from physical DVD shipping postage to digital streaming bits).
If you only do Delight without Margin, you go bankrupt. If you only do Margin without Delight, customers churn. High-performing product teams balance all three pillars.`
      }
    ]
  }
];

// Helper to get all chunks flattened
export const ALL_TRANSCRIPT_CHUNKS: TranscriptChunk[] = LENNY_EPISODES.flatMap(ep => ep.chunks);

// Hybrid RAG Search function (Keyword + Exact Match + Token Overlap Scoring)
export function searchTranscripts(query: string, limit: number = 4): SearchResult[] {
  if (!query || query.trim().length === 0) {
    return ALL_TRANSCRIPT_CHUNKS.slice(0, limit).map(c => ({
      chunk: c,
      score: 1.0,
      matchedTerms: []
    }));
  }

  const cleanQuery = query.toLowerCase();
  const queryTokens = cleanQuery
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(t => t.length > 2);

  const results: SearchResult[] = ALL_TRANSCRIPT_CHUNKS.map(chunk => {
    let score = 0;
    const matchedTerms: string[] = [];
    const contentLower = chunk.content.toLowerCase();
    const guestLower = chunk.guest.toLowerCase();
    const titleLower = chunk.episodeTitle.toLowerCase();
    const tagsLower = chunk.tags.map(t => t.toLowerCase()).join(' ');

    // 1. Direct Guest Name Match (High Weight)
    if (contentLower.includes(cleanQuery) || guestLower.includes(cleanQuery)) {
      score += 4.0;
    }

    // 2. Token Matching
    for (const token of queryTokens) {
      let tokenMatched = false;
      if (guestLower.includes(token)) {
        score += 3.0;
        tokenMatched = true;
      }
      if (tagsLower.includes(token)) {
        score += 2.5;
        tokenMatched = true;
      }
      if (titleLower.includes(token)) {
        score += 2.0;
        tokenMatched = true;
      }
      if (contentLower.includes(token)) {
        // Count occurrences
        const count = (contentLower.match(new RegExp(token, 'g')) || []).length;
        score += Math.min(count * 0.8, 3.0);
        tokenMatched = true;
      }

      if (tokenMatched && !matchedTerms.includes(token)) {
        matchedTerms.push(token);
      }
    }

    // Boost score if specific product keywords are found
    if (cleanQuery.includes('plg') && chunk.tags.includes('PLG Definition')) score += 3.0;
    if (cleanQuery.includes('founder mode') && chunk.guest.includes('Chesky')) score += 4.0;
    if (cleanQuery.includes('lno') && chunk.guest.includes('Shreyas')) score += 4.0;
    if (cleanQuery.includes('loop') && chunk.guest.includes('Casey')) score += 3.5;
    if (cleanQuery.includes('metric') && chunk.guest.includes('Julie')) score += 3.0;
    if (cleanQuery.includes('pmf') && (chunk.guest.includes('Sean') || chunk.guest.includes('Gustaf'))) score += 3.5;
    if (cleanQuery.includes('dhm') && chunk.guest.includes('Gibson')) score += 4.0;

    return {
      chunk,
      score,
      matchedTerms
    };
  });

  // Sort descending by score
  return results
    .filter(r => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}
