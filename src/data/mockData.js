// ── Mock Data for BuildSphereX (IIT Dharwad) ──

export const SKILLS = [
  // Development
  'Backend Developer', 'Frontend Developer', 'Full Stack Developer',
  'AI / ML Engineer', 'Data Scientist', 'Mobile App Developer',
  'UI / UX Designer', 'DevOps Engineer', 'Cybersecurity Engineer',
  'Embedded Systems Developer',
  // Business & Strategy
  'Product Manager', 'Business Strategist', 'Market Research Analyst',
  'Financial Analyst', 'Growth Strategist', 'Startup Pitch Creator',
  'Investor Relations Manager',
  // Design & Creative
  'Graphic Designer', 'Brand Designer', 'Logo Designer',
  'Video Editor', 'Motion Graphics Designer', 'Content Creator',
  'UI Illustrator',
  // Research
  'Technology Researcher', 'AI Research Assistant',
  'Product Experimentation Lead', 'Competitive Analysis Researcher',
  'Patent Researcher',
  // Community & Outreach
  'Community Manager', 'Startup Evangelist', 'Social Media Manager',
  'Event Organizer', 'Partnership Manager', 'Campus Ambassador',
  'Documentation Lead'
];

export const SKILL_COLORS = {
  // Development
  'Backend Developer': '#10b981',
  'Frontend Developer': '#3b82f6',
  'Full Stack Developer': '#6366f1',
  'AI / ML Engineer': '#0284c7',
  'Data Scientist': '#0e7490',
  'Mobile App Developer': '#06b6d4',
  'UI / UX Designer': '#0f172a',
  'DevOps Engineer': '#ef4444',
  'Cybersecurity Engineer': '#f97316',
  'Embedded Systems Developer': '#14b8a6',
  // Business & Strategy
  'Product Manager': '#0ea5e9',
  'Business Strategist': '#f59e0b',
  'Market Research Analyst': '#84cc16',
  'Financial Analyst': '#6366f1',
  'Growth Strategist': '#10b981',
  'Startup Pitch Creator': '#e11d48',
  'Investor Relations Manager': '#7c3aed',
  // Design & Creative
  'Graphic Designer': '#0f172a',
  'Brand Designer': '#d946ef',
  'Logo Designer': '#f43f5e',
  'Video Editor': '#f97316',
  'Motion Graphics Designer': '#0284c7',
  'Content Creator': '#0891b2',
  'UI Illustrator': '#db2777',
  // Research
  'Technology Researcher': '#2563eb',
  'AI Research Assistant': '#7c3aed',
  'Product Experimentation Lead': '#059669',
  'Competitive Analysis Researcher': '#ca8a04',
  'Patent Researcher': '#4f46e5',
  // Community & Outreach
  'Community Manager': '#0d9488',
  'Startup Evangelist': '#e11d48',
  'Social Media Manager': '#0e7490',
  'Event Organizer': '#ea580c',
  'Partnership Manager': '#0284c7',
  'Campus Ambassador': '#16a34a',
  'Documentation Lead': '#64748b'
};

export const FORUM_CATEGORIES = [
  { id: 'tech', name: 'Inter-IIT Tech', icon: '💻', color: '#3b82f6', description: 'Discuss Inter-IIT tech competitions, strategies, and projects' },
  { id: 'finance', name: 'Finance', icon: '💰', color: '#10b981', description: 'Startup funding, VC, financial planning & investment discussions' },
  { id: 'business', name: 'Business', icon: '📊', color: '#f59e0b', description: 'Business models, go-to-market strategies, and entrepreneurship' },
  { id: 'ideas', name: 'Startup Ideas', icon: '💡', color: '#0284c7', description: 'Share, refine, and validate your startup ideas' },
  { id: 'general', name: 'General', icon: '🌐', color: '#6366f1', description: 'Campus life, networking, events, and everything else' }
];

export const mockUsers = [
  {
    id: 'u1',
    name: 'Arjun Mehta',
    avatar: null,
    initials: 'AM',
    college: 'IIT Dharwad',
    year: '3rd Year',
    branch: 'Computer Science and Engineering',
    bio: 'Full-stack developer passionate about AI and building products that matter. Leading multiple Inter-IIT tech projects.',
    skills: ['AI / ML Engineer', 'Frontend Developer', 'Backend Developer', 'DevOps Engineer'],
    ideasPosted: 3,
    collaborations: 5,
    joinedDate: '2025-08-15'
  },
  {
    id: 'u2',
    name: 'Priya Sharma',
    avatar: null,
    initials: 'PS',
    college: 'IIT Dharwad',
    year: '2nd Year',
    branch: 'Electrical, Electronics & Communication Engineering',
    bio: 'UI/UX designer & frontend developer. Love creating beautiful, intuitive interfaces for hardware-software products.',
    skills: ['UI / UX Designer', 'Frontend Developer', 'Mobile App Developer'],
    ideasPosted: 2,
    collaborations: 4,
    joinedDate: '2025-09-01'
  },
  {
    id: 'u3',
    name: 'Rahul Gupta',
    avatar: null,
    initials: 'RG',
    college: 'IIT Dharwad',
    year: '4th Year',
    branch: 'Mechanical, Materials and Aerospace Engineering',
    bio: 'Business strategy enthusiast with a knack for product management. Exploring defence tech at E-Summit.',
    skills: ['Product Manager', 'Growth Strategist', 'Financial Analyst'],
    ideasPosted: 4,
    collaborations: 7,
    joinedDate: '2025-07-20'
  },
  {
    id: 'u4',
    name: 'Kavya Iyer',
    avatar: null,
    initials: 'KI',
    college: 'IIT Dharwad',
    year: '3rd Year',
    branch: 'Biosciences & Bioengineering',
    bio: 'Data scientist and ML engineer. Working on BioNEST healthcare projects via the dhaRti Foundation.',
    skills: ['AI / ML Engineer', 'Data Scientist', 'Backend Developer'],
    ideasPosted: 1,
    collaborations: 3,
    joinedDate: '2025-10-05'
  },
  {
    id: 'u5',
    name: 'Vikram Singh',
    avatar: null,
    initials: 'VS',
    college: 'IIT Dharwad',
    year: 'M.Tech 1st Year',
    branch: 'Mathematics',
    bio: 'Full stack developer & IoT enthusiast. Building solutions for the permanent campus at Chikkamalligawad.',
    skills: ['Full Stack Developer', 'Frontend Developer', 'DevOps Engineer'],
    ideasPosted: 2,
    collaborations: 2,
    joinedDate: '2025-11-10'
  }
];

export const mockIdeas = [
  {
    id: 'idea1',
    title: 'AI Study Assistant',
    description: 'An AI-powered study assistant that creates personalized study plans, generates practice questions from lecture notes, and provides instant doubt resolution using NLP.',
    problem: 'Students struggle with organizing study material, finding relevant practice questions, and getting timely help with doubts — especially during exam season.',
    solution: 'An AI assistant that ingests lecture PDFs, creates smart summaries, generates topic-wise MCQs, and answers doubts 24/7 using a fine-tuned LLM.',
    category: 'ideas',
    status: 'building',
    author: mockUsers[0],
    skills: ['AI / ML Engineer', 'Frontend Developer', 'UI / UX Designer'],
    teamSize: 4,
    collaborators: [mockUsers[0], mockUsers[1], mockUsers[3]],
    votes: 47,
    userVote: 0,
    commentsCount: 12,
    comments: [
      { id: 'c1', author: mockUsers[1], text: 'This is amazing! I\'d love to design the UI for this. The study plan feature sounds really useful.', timestamp: '2026-03-15T10:30:00', votes: 8 },
      { id: 'c2', author: mockUsers[2], text: 'Have you considered adding a spaced repetition algorithm? It could significantly improve retention.', timestamp: '2026-03-15T11:00:00', votes: 5 },
      { id: 'c3', author: mockUsers[3], text: 'I can help with the NLP pipeline. We should use RAG for the doubt resolution feature.', timestamp: '2026-03-15T14:20:00', votes: 12 },
    ],
    createdAt: '2026-03-10',
    updatedAt: '2026-03-15'
  },
  {
    id: 'idea2',
    title: 'Smart Campus Navigation for WAL',
    description: 'Indoor & outdoor navigation app for IIT Dharwad\'s permanent campus at Chikkamalligawad with AR wayfinding, real-time crowd density, and event location tracking.',
    problem: 'New students and visitors get lost navigating the massive IIT Dharwad permanent campus. Finding specific labs in WAL (Walmi Academic Layout) and event venues is a nightmare.',
    solution: 'A mobile app with AR navigation, building floor maps, and crowd-sourced event tracking. Uses BLE beacons for indoor positioning across campus buildings.',
    category: 'ideas',
    status: 'concept',
    author: mockUsers[1],
    skills: ['Mobile App Developer', 'UI / UX Designer', 'Backend Developer', 'AI / ML Engineer'],
    teamSize: 5,
    collaborators: [mockUsers[1], mockUsers[4]],
    votes: 35,
    userVote: 0,
    commentsCount: 8,
    comments: [
      { id: 'c4', author: mockUsers[0], text: 'Inter-IIT worthy project! The AR wayfinding could be a game-changer for the new permanent campus.', timestamp: '2026-03-12T09:00:00', votes: 6 },
      { id: 'c5', author: mockUsers[4], text: 'We could integrate this with the campus ERP for class schedules in MMAE and CSE blocks.', timestamp: '2026-03-12T10:30:00', votes: 4 },
    ],
    createdAt: '2026-03-08',
    updatedAt: '2026-03-12'
  },
  {
    id: 'idea3',
    title: 'Low-Cost Bio-Vitals Monitor',
    description: 'An open-source, affordable vital monitoring wearable designed for rural clinics around Dharwad district. Targeting incubation at dhaRti BioNEST.',
    problem: 'Rural health centers surrounding Dharwad lack affordable equipment for continuous monitoring of patient vitals like SpO2, heart rate, and blood pressure.',
    solution: 'An open-source wearable with an ESP32 core, PPG sensor, and BLE connectivity. Data transmitted to a phone app. Planning to incubate through the dhaRti BioNEST Incubation Centre at IIT Dharwad.',
    category: 'ideas',
    status: 'mvp',
    author: mockUsers[2],
    skills: ['Embedded Systems Developer', 'UI / UX Designer', 'Backend Developer', 'Data Scientist'],
    teamSize: 6,
    collaborators: [mockUsers[2], mockUsers[0], mockUsers[1], mockUsers[3]],
    votes: 62,
    userVote: 0,
    commentsCount: 15,
    comments: [
      { id: 'c6', author: mockUsers[0], text: 'The dhaRti BioNEST connection is a huge advantage. Have you applied for the BIRAC seed grant yet?', timestamp: '2026-03-05T16:00:00', votes: 15 },
      { id: 'c7', author: mockUsers[3], text: 'I can help with the bio-signal processing pipeline. My lab in Biosciences & Bioengineering has the equipment we need.', timestamp: '2026-03-05T17:30:00', votes: 9 },
    ],
    createdAt: '2026-03-01',
    updatedAt: '2026-03-14'
  },
  {
    id: 'idea4',
    title: 'Campus Marketplace',
    description: 'A secure buy/sell/rent marketplace exclusively for IIT Dharwad students — textbooks, electronics, lab equipment, and skill-based services.',
    problem: 'Students waste money buying new textbooks and equipment that seniors are willing to sell. Current solutions (WhatsApp groups) are unorganized and unverifiable.',
    solution: 'A verified student-only marketplace with categories, search, in-app chat, and UPI payment integration. Includes a "Services" section for freelance skills within campus.',
    category: 'ideas',
    status: 'concept',
    author: mockUsers[3],
    skills: ['Frontend Developer', 'Mobile App Developer', 'Backend Developer', 'UI / UX Designer'],
    teamSize: 4,
    collaborators: [mockUsers[3]],
    votes: 28,
    userVote: 0,
    commentsCount: 6,
    comments: [
      { id: 'c8', author: mockUsers[2], text: 'Market validation is strong — every student needs this. What\'s the revenue model?', timestamp: '2026-03-14T11:00:00', votes: 7 },
    ],
    createdAt: '2026-03-13',
    updatedAt: '2026-03-14'
  },
  {
    id: 'idea5',
    title: 'Research Paper Summarizer',
    description: 'An AI tool that reads research papers, generates visual summaries with key findings, methodology flowcharts, and citation graphs.',
    problem: 'Graduate students and faculty at IIT Dharwad spend hours reading dense research papers. Understanding methodology and extracting key insights is time-consuming.',
    solution: 'Upload any PDF paper → get a structured summary with: key findings, methodology diagram, citation network, and a "So What?" section explaining practical implications.',
    category: 'ideas',
    status: 'building',
    author: mockUsers[0],
    skills: ['AI / ML Engineer', 'Data Scientist', 'Frontend Developer'],
    teamSize: 3,
    collaborators: [mockUsers[0], mockUsers[3]],
    votes: 41,
    userVote: 0,
    commentsCount: 9,
    comments: [
      { id: 'c9', author: mockUsers[3], text: 'I\'ve been working on something similar in the Biosciences dept! Let\'s combine efforts. I have a working PDF parser.', timestamp: '2026-03-11T13:00:00', votes: 11 },
    ],
    createdAt: '2026-03-07',
    updatedAt: '2026-03-13'
  },
  {
    id: 'idea6',
    title: 'Defence Swarm Drone System',
    description: 'Autonomous micro-drone swarm for surveillance in harsh terrain — targeting the E-Summit Defence & Space sector pitch.',
    problem: 'Manual surveillance in harsh border and mountainous terrain is risky and inefficient for armed forces personnel.',
    solution: 'A swarm of autonomous micro-drones communicating via mesh network for real-time 3D terrain mapping. Designed in MMAE labs with lightweight carbon fiber chassis.',
    category: 'ideas',
    status: 'concept',
    author: mockUsers[4],
    skills: ['AI / ML Engineer', 'Embedded Systems Developer', 'Backend Developer', 'DevOps Engineer'],
    teamSize: 4,
    collaborators: [mockUsers[4], mockUsers[0]],
    votes: 19,
    userVote: 0,
    commentsCount: 4,
    comments: [
      { id: 'c10', author: mockUsers[2], text: 'This is perfect for the E-Summit Defence track! Have you connected with the MMAE faculty for prototyping support?', timestamp: '2026-03-16T09:00:00', votes: 3 },
    ],
    createdAt: '2026-03-15',
    updatedAt: '2026-03-16'
  },
  {
    id: 'idea7',
    title: 'Mental Health Support Bot',
    description: 'An empathetic AI chatbot for student mental health — provides CBT-based exercises, mood tracking, and anonymous peer support connections.',
    problem: 'Student mental health is in crisis. Campus counseling has long wait times, and students hesitate to seek help due to stigma.',
    solution: 'A 24/7 AI companion that uses CBT techniques, tracks mood patterns, suggests exercises, and connects students with anonymous peer supporters or professionals when needed.',
    category: 'ideas',
    status: 'building',
    author: mockUsers[1],
    skills: ['AI / ML Engineer', 'Mobile App Developer', 'UI / UX Designer', 'Backend Developer'],
    teamSize: 5,
    collaborators: [mockUsers[1], mockUsers[0], mockUsers[3]],
    votes: 55,
    userVote: 0,
    commentsCount: 18,
    comments: [
      { id: 'c11', author: mockUsers[2], text: 'This is incredibly important work. As someone who struggled, I wish this existed when I was a fresher.', timestamp: '2026-03-09T20:00:00', votes: 22 },
    ],
    createdAt: '2026-03-04',
    updatedAt: '2026-03-15'
  },
  {
    id: 'idea8',
    title: 'Green Campus Energy Tracker',
    description: 'IoT + ML platform to monitor and optimize energy consumption across the IIT Dharwad permanent campus buildings, with gamified sustainability challenges.',
    problem: 'The new permanent campus at Chikkamalligawad has growing energy demands. No visibility into consumption patterns across hostels and academic blocks.',
    solution: 'IoT sensors + ML-based anomaly detection for energy monitoring. Dashboard with real-time consumption, hostel-wise leaderboards, and sustainability challenges.',
    category: 'ideas',
    status: 'concept',
    author: mockUsers[2],
    skills: ['Data Scientist', 'Frontend Developer', 'DevOps Engineer', 'Growth Strategist'],
    teamSize: 5,
    collaborators: [mockUsers[2], mockUsers[4]],
    votes: 23,
    userVote: 0,
    commentsCount: 5,
    comments: [],
    createdAt: '2026-03-12',
    updatedAt: '2026-03-14'
  }
];

export const mockForumPosts = [
  // Inter-IIT Tech
  {
    id: 'fp1',
    title: 'Inter-IIT Tech Meet 13.0 — What projects are you all working on?',
    content: 'Hey everyone! Inter-IIT Tech Meet 13.0 is around the corner. Our team at IIT Dharwad is working on a computer vision project for the Goldman Sachs problem statement. What are your teams building? Drop your project details and let\'s discuss strategies!\n\nWe are focusing on:\n- Real-time object detection using YOLOv8\n- Custom dataset creation from campus CCTV feeds\n- Edge deployment on Raspberry Pi\n\nWould love to hear how other teams are approaching their problem statements.',
    category: 'tech',
    author: mockUsers[0],
    votes: 34,
    userVote: 0,
    replies: 12,
    tags: ['inter-iit', 'tech-meet', 'computer-vision'],
    pinned: true,
    comments: [
      { id: 'fc1', author: mockUsers[3], text: 'Our Biosciences team is working alongside CSE on a medical imaging problem statement — super exciting cross-department collab!', timestamp: '2026-03-15T08:00:00', votes: 8 },
      { id: 'fc2', author: mockUsers[4], text: 'Math dept here. We\'re tackling the optimization track — building a supply chain optimizer using advanced LP techniques.', timestamp: '2026-03-15T09:30:00', votes: 6 },
      { id: 'fc3', author: mockUsers[1], text: 'Your edge deployment approach is clever. Have you tried TensorRT for optimization? We got 3x speedup on our model.', timestamp: '2026-03-15T10:15:00', votes: 11 },
    ],
    createdAt: '2026-03-14T18:00:00',
    updatedAt: '2026-03-15T10:15:00'
  },
  {
    id: 'fp2',
    title: 'Best resources to prepare for Inter-IIT coding competitions',
    content: 'Compilation of resources our team used to prepare:\n\n1. **Competitive Programming**: Codeforces, LeetCode (contest section)\n2. **System Design**: System Design Primer (GitHub)\n3. **ML/AI**: Fast.ai, Kaggle competitions\n4. **Web Dev**: Full Stack Open (Helsinki)\n\nWhat resources does your team recommend?',
    category: 'tech',
    author: mockUsers[3],
    votes: 28,
    userVote: 0,
    replies: 8,
    tags: ['resources', 'preparation', 'coding'],
    pinned: false,
    comments: [
      { id: 'fc4', author: mockUsers[0], text: 'Great list! I\'d add Hugging Face courses for NLP tasks — they\'re incredibly practical.', timestamp: '2026-03-13T14:00:00', votes: 5 },
    ],
    createdAt: '2026-03-13T10:00:00',
    updatedAt: '2026-03-13T14:00:00'
  },
  // Finance
  {
    id: 'fp3',
    title: 'dhaRti Foundation seed funding — application tips',
    content: 'I recently applied for the dhaRti Foundation seed funding at IIT Dharwad and got through! Sharing what I learned:\n\n**The application structure that worked:**\n1. Problem statement (with data from Dharwad district)\n2. Your solution — working prototype is a MUST\n3. Market sizing — TAM, SAM, SOM for Karnataka/India\n4. Team credentials — mention faculty mentors\n5. Budget breakdown — be specific about what you\'ll use the seed money for\n\n**Key sectors dhaRti focuses on:**\n- Biosciences Innovation (Drug Discovery, MedTech)\n- NewGen Technologies (Additive Manufacturing, Defence)\n- Clean Energy & Sustainability\n- Sustainable Food & Agriculture\n\nAlso, the new BioNEST Incubation Centre (backed by BIRAC) is accepting applications. Great for biotech and healthcare startups.\n\nAny other tips from folks who\'ve been through the dhaRti process?',
    category: 'finance',
    author: mockUsers[2],
    votes: 45,
    userVote: 0,
    replies: 15,
    tags: ['dhaRti', 'funding', 'BioNEST'],
    pinned: true,
    comments: [
      { id: 'fc5', author: mockUsers[0], text: 'This is gold! One thing I\'d add — always have a working prototype. dhaRti mentors care about execution speed over perfection.', timestamp: '2026-03-12T16:00:00', votes: 12 },
      { id: 'fc6', author: mockUsers[3], text: 'The BioNEST angle is amazing for our healthcare startup. Do you know if they provide lab access too?', timestamp: '2026-03-12T17:30:00', votes: 7 },
    ],
    createdAt: '2026-03-12T12:00:00',
    updatedAt: '2026-03-12T17:30:00'
  },
  {
    id: 'fp4',
    title: 'Student startup grants and funding opportunities in India (2026)',
    content: 'Here\'s a comprehensive list of funding opportunities for student startups:\n\n🏛️ **Government Programs:**\n- Startup India Seed Fund (up to ₹50L)\n- NIDHI Prayas (up to ₹10L for prototyping)\n- DST-NIMAT (mentoring + funding)\n- BIRAC BIG Grant (biotech startups)\n\n🎓 **IIT Dharwad Specific:**\n- dhaRti Foundation seed funding\n- dhaRti BioNEST grants (up to ₹5L for prototyping)\n- IIC Innovation Council grants\n- E-Summit pitch competition prizes\n\n🏢 **Private:**\n- Venture Highway Student Program\n- 100X.VC student cohort\n- Antler India residency\n\nHas anyone applied to any of these? What\'s the process like?',
    category: 'finance',
    author: mockUsers[3],
    votes: 52,
    userVote: 0,
    replies: 20,
    tags: ['funding', 'grants', 'dhaRti', 'BioNEST'],
    pinned: false,
    comments: [],
    createdAt: '2026-03-10T09:00:00',
    updatedAt: '2026-03-11T10:00:00'
  },
  // Business
  {
    id: 'fp5',
    title: 'Building a business model canvas for your student startup',
    content: 'The Business Model Canvas is the single most useful framework I\'ve used. Here\'s how to fill each section for a student startup:\n\n**Customer Segments:** Start with IIT Dharwad campus (~1,075 students)\n**Value Proposition:** What pain are you solving better than alternatives?\n**Channels:** Instagram, WhatsApp groups, campus events, E-Summit\n**Revenue Streams:** Freemium is king for student products\n**Key Resources:** Your team\'s skills + campus network + dhaRti mentorship\n**Key Activities:** Build → Test → Iterate\n**Key Partners:** IIC, dhaRti Foundation, faculty mentors, alumni network\n**Cost Structure:** Keep it lean — use free tiers everywhere\n\nShare your BMC if you want feedback!',
    category: 'business',
    author: mockUsers[2],
    votes: 38,
    userVote: 0,
    replies: 11,
    tags: ['business-model', 'strategy', 'canvas'],
    pinned: false,
    comments: [
      { id: 'fc7', author: mockUsers[4], text: 'Great breakdown! I think the biggest mistake student startups make is trying to monetize too early. Focus on user acquisition first.', timestamp: '2026-03-11T15:00:00', votes: 9 },
    ],
    createdAt: '2026-03-11T10:00:00',
    updatedAt: '2026-03-11T15:00:00'
  },
  {
    id: 'fp6',
    title: 'Go-to-market strategy for campus-first products',
    content: 'Learned this the hard way — launching a product across all campuses at once is a recipe for disaster. Here\'s what works:\n\n**Phase 1:** Dominate IIT Dharwad first\n- Target one hostel or one department\n- Get 100 passionate users, not 1000 lukewarm ones\n- Build with constant user feedback\n\n**Phase 2:** Expand to mentoring institution (IIT Bombay) & nearby NITs\n- Leverage Inter-IIT connections\n- Find campus ambassadors (not influencers — USERS)\n\n**Phase 3:** Open to all campuses\n- By now you have product-market fit\n- Organic word-of-mouth should be your primary channel\n\nThe temptation to "go big" is real. Resist it.',
    category: 'business',
    author: mockUsers[0],
    votes: 31,
    userVote: 0,
    replies: 9,
    tags: ['go-to-market', 'growth', 'campus'],
    pinned: false,
    comments: [],
    createdAt: '2026-03-09T14:00:00',
    updatedAt: '2026-03-10T08:00:00'
  },
  // Startup Ideas
  {
    id: 'fp7',
    title: '🔥 Idea: AI-powered placement preparation platform',
    content: 'Here\'s an idea I\'ve been thinking about:\n\n**Problem:** Placement prep is scattered — different resources for DSA, aptitude, HR, and company-specific prep. Students waste time organizing.\n\n**Solution:** An AI platform that:\n- Creates a personalized prep roadmap based on target companies\n- Adaptive mock interviews with AI feedback\n- Company-specific question banks (crowd-sourced from seniors)\n- Peer mock interview matching\n\n**Why now:** GPT-4 level models make AI interviews viable. Every engineering student needs this.\n\n**Revenue:** ₹199/month or ₹999/year\n\nWho wants to build this with me? Need: 1 ML engineer, 1 frontend dev, 1 backend dev.',
    category: 'ideas',
    author: mockUsers[0],
    votes: 67,
    userVote: 0,
    replies: 23,
    tags: ['placement', 'ai', 'edtech'],
    pinned: true,
    comments: [
      { id: 'fc8', author: mockUsers[1], text: 'This has massive potential! I can handle the frontend. The AI mock interview feature alone would be worth the subscription.', timestamp: '2026-03-14T20:00:00', votes: 15 },
      { id: 'fc9', author: mockUsers[3], text: 'I\'m in for the ML side. We could use Whisper for speech-to-text in mock interviews and GPT-4 for feedback generation.', timestamp: '2026-03-14T21:00:00', votes: 13 },
    ],
    createdAt: '2026-03-14T18:00:00',
    updatedAt: '2026-03-14T21:00:00'
  },
  {
    id: 'fp8',
    title: 'Idea validation: Student freelance marketplace (campus-only)',
    content: 'Quick idea I want to validate:\n\n**Concept:** A freelance marketplace restricted to verified IIT Dharwad students.\n\nServices like:\n- Assignment help (tutoring, NOT cheating)\n- Graphic design for fest posters\n- Video editing for club events\n- Web development\n- Content writing for research papers\n- Photography for events\n\n**Why campus-only:** Trust, accountability, easy payments via UPI.\n\nWould you use this? Would you offer services on it?\n\nDrop your honest feedback — is this worth building or is it a solution looking for a problem?',
    category: 'ideas',
    author: mockUsers[4],
    votes: 22,
    userVote: 0,
    replies: 14,
    tags: ['marketplace', 'freelance', 'validation'],
    pinned: false,
    comments: [
      { id: 'fc10', author: mockUsers[2], text: 'This could work if you nail the trust/review system. The campus-only angle is smart. Start with CSE dept and expand.', timestamp: '2026-03-16T10:00:00', votes: 6 },
    ],
    createdAt: '2026-03-16T08:00:00',
    updatedAt: '2026-03-16T10:00:00'
  },
  // General
  {
    id: 'fp9',
    title: 'Welcome to BuildSphereX! Introduce yourself 👋',
    content: 'Hey builders! 🚀\n\nWelcome to BuildSphereX — the platform built by IIT Dharwad students for IIT Dharwad students.\n\nIntroduce yourself:\n- Name & Department\n- Year\n- Skills you bring\n- What kind of startup excites you\n- Are you looking for a team or have an idea?\n\nDepartments at IIT Dharwad:\n🔬 CSE | EECE | MMAE | Maths | Physics | Chemistry | Biosciences | Civil & Infra | HEART\n\nLet\'s connect and build something amazing together! 💪',
    category: 'general',
    author: mockUsers[0],
    votes: 89,
    userVote: 0,
    replies: 45,
    tags: ['introduction', 'welcome', 'community'],
    pinned: true,
    comments: [
      { id: 'fc11', author: mockUsers[1], text: 'Hey! Priya from EECE dept 👋 2nd year. I do UI/UX and frontend dev. Looking for a team working in HealthTech or EdTech!', timestamp: '2026-03-01T10:00:00', votes: 8 },
      { id: 'fc12', author: mockUsers[2], text: 'Rahul from MMAE. 4th year. Product management + business strategy. Already built 2 projects. Happy to mentor or join interesting ventures!', timestamp: '2026-03-01T11:00:00', votes: 12 },
      { id: 'fc13', author: mockUsers[4], text: 'Vikram from Maths dept! Full stack & IoT. Looking for cofounders for a campus energy monitoring project.', timestamp: '2026-03-01T12:00:00', votes: 5 },
    ],
    createdAt: '2026-03-01T08:00:00',
    updatedAt: '2026-03-01T12:00:00'
  },
  {
    id: 'fp10',
    title: 'E-Summit 2025 highlights & what\'s coming in 2026',
    content: 'Recap of E-Summit \'25 and what to expect:\n\n📅 **E-Summit \'25 Highlights (Aug 23-24, 2025):**\n- Theme: Defence & Space sector\n- 15+ startup pitches from IIT Dharwad teams\n- Guest speakers from ISRO and DRDO\n- ₹3L prize pool across all tracks\n\n🔮 **What\'s coming for E-Summit \'26:**\n- IIC is planning a bigger format with inter-IIT participation\n- New tracks: CleanTech, AgriTech, EdTech\n- dhaRti Foundation confirmed as incubation partner\n- Demo Day format with real investor panels\n\n📍 **Mark your calendars:** IIT Dharwad E-Summit 2026 — likely Sept 2026\n\nAnyone attending? Let\'s meet up and plan our pitches!',
    category: 'general',
    author: mockUsers[1],
    votes: 42,
    userVote: 0,
    replies: 18,
    tags: ['e-summit', 'events', 'IIC', 'dhaRti'],
    pinned: false,
    comments: [],
    createdAt: '2026-03-15T12:00:00',
    updatedAt: '2026-03-15T14:00:00'
  }
];

export const STATUS_CONFIG = {
  concept: { label: 'Concept', color: '#6366f1', bg: 'rgba(99, 102, 241, 0.15)' },
  building: { label: 'Building', color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.15)' },
  mvp: { label: 'MVP Ready', color: '#10b981', bg: 'rgba(16, 185, 129, 0.15)' },
  launched: { label: 'Launched', color: '#0f172a', bg: 'rgba(236, 72, 153, 0.15)' }
};
