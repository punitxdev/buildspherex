import dotenv from 'dotenv';
import mongoose from 'mongoose';
import User from './models/User.js';
import Idea from './models/Idea.js';
import ForumPost from './models/ForumPost.js';
import Announcement from './models/Announcement.js';

dotenv.config();

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Idea.deleteMany({});
    await ForumPost.deleteMany({});
    await Announcement.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Create users
    const users = await User.create([
      { name: 'Arjun Mehta', email: 'arjun@iitdh.ac.in', password: 'password123', college: 'IIT Dharwad', branch: 'Computer Science & Engg', year: '3rd Year', bio: 'Full-stack dev obsessed with EdTech. Built 3 apps during Inter-IIT.', skills: ['Full Stack Developer', 'AI / ML Engineer', 'Product Manager'] },
      { name: 'Sneha Kulkarni', email: 'sneha@iitdh.ac.in', password: 'password123', college: 'IIT Dharwad', branch: 'EECE', year: '4th Year', bio: 'Hardware meets ML. Passionate about embedded systems and IoT.', skills: ['Embedded Systems Developer', 'AI / ML Engineer', 'Technology Researcher'] },
      { name: 'Ravi Iyer', email: 'ravi@iitdh.ac.in', password: 'password123', college: 'IIT Dharwad', branch: 'Biosciences & Bioengineering', year: '3rd Year', bio: 'Biotech researcher exploring healthcare solutions for rural India.', skills: ['Technology Researcher', 'Data Scientist', 'Patent Researcher'] },
      { name: 'Ananya Deshmukh', email: 'ananya@iitdh.ac.in', password: 'password123', college: 'IIT Dharwad', branch: 'MMAE', year: '2nd Year', bio: 'Mechanical engineer fascinated by drone tech and aerospace.', skills: ['Embedded Systems Developer', 'UI / UX Designer', 'Product Manager'] },
      { name: 'Vikram Joshi', email: 'vikram@iitdh.ac.in', password: 'password123', college: 'IIT Dharwad', branch: 'Mathematics', year: '4th Year', bio: 'Data scientist with a love for financial modeling and algorithms.', skills: ['Data Scientist', 'Financial Analyst', 'Backend Developer'] },
    ]);
    console.log(`👤 Created ${users.length} users`);

    // Create ideas
    const ideas = await Idea.create([
      {
        title: 'AI Study Assistant for IIT Dharwad',
        description: 'A smart study companion that uses NLP to summarize lecture notes, generate practice questions, and create personalized study plans based on the IIT Dharwad curriculum across all 10 departments.',
        problem: 'Students at IIT Dharwad spend too much time organizing notes across courses and departments. No centralized tool exists for the specific IIT Dharwad curriculum.',
        solution: 'An AI-powered app trained on IIT Dharwad course content. Scans lecture PDFs, generates flashcards and quizzes, and adapts to each student\'s learning pace.',
        skills: ['Full Stack Developer', 'AI / ML Engineer', 'UI / UX Designer'],
        status: 'building',
        teamSize: 5,
        author: users[0]._id,
        collaborators: [users[0]._id, users[1]._id],
        votes: 42,
        commentsCount: 5,
      },
      {
        title: 'Smart Campus Navigation for WAL',
        description: 'An AR-powered navigation app for IIT Dharwad\'s 470-acre permanent campus at Chikkamalligawad. Helps new students, visitors, and faculty navigate between academic blocks, hostels, labs, and the Workshop at Large (WAL).',
        problem: 'The permanent campus is massive and expanding. New students and visitors frequently get lost. Signage is insufficient for the 470-acre campus.',
        solution: 'Mobile app with AR overlays and offline maps. Real-time tracking of campus shuttles. Indoor navigation for academic blocks and WAL.',
        skills: ['Mobile App Developer', 'UI / UX Designer', 'Backend Developer'],
        status: 'concept',
        teamSize: 4,
        author: users[3]._id,
        collaborators: [users[3]._id],
        votes: 28,
        commentsCount: 3,
      },
      {
        title: 'Low-Cost Bio-Vitals Monitor',
        description: 'A wearable health monitor designed for rural Dharwad district. Tracks heart rate, SpO2, temperature, and BP — syncs with a mobile app for telemedicine consultations. Built for dhaRti BioNEST incubation.',
        problem: 'Healthcare access in Dharwad district is limited. PHCs lack continuous monitoring equipment. Patients travel hours for basic vitals checks.',
        solution: 'An INR 500 wearable device with Bluetooth. Built with commodity sensors and a custom PCB designed in the EECE lab. Mobile app for doctors to monitor remotely.',
        skills: ['Embedded Systems Developer', 'Mobile App Developer', 'Data Scientist'],
        status: 'mvp',
        teamSize: 6,
        author: users[2]._id,
        collaborators: [users[2]._id, users[1]._id, users[0]._id],
        votes: 67,
        commentsCount: 8,
      },
      {
        title: 'Defence Swarm Drone System',
        description: 'An autonomous swarm drone platform for surveillance and rescue operations. Built for the E-Summit Defence & Space sector pitch. Uses mesh networking and computer vision for coordinated flight.',
        problem: 'Border patrol and disaster rescue rely on single-operator drones with limited range and coordination. No Indian student team has built a working swarm platform.',
        solution: 'A fleet of 5-10 custom drones with onboard Jetson Nano. Mesh networking via LoRa. Computer vision for target identification. All from the MMAE/EECE labs.',
        skills: ['Embedded Systems Developer', 'AI / ML Engineer', 'DevOps Engineer'],
        status: 'building',
        teamSize: 5,
        author: users[3]._id,
        collaborators: [users[3]._id, users[4]._id],
        votes: 51,
        commentsCount: 6,
      },
      {
        title: 'Campus Marketplace – Buy/Sell/Rent',
        description: 'A secure marketplace for IIT Dharwad students to buy, sell, and rent textbooks, lab equipment, cycles, and electronics within campus. Escrow-based payments and hostel-level delivery.',
        problem: 'Every semester, outgoing students dump perfectly good items. Incoming students buy new ones. There\'s no trusted platform for intra-campus commerce.',
        solution: 'A web app with user verification via IIT Dharwad email. Listing with photos, in-app chat, and a simple escrow payment flow via UPI.',
        skills: ['Full Stack Developer', 'UI / UX Designer', 'Growth Strategist'],
        status: 'concept',
        teamSize: 3,
        author: users[0]._id,
        collaborators: [users[0]._id],
        votes: 35,
        commentsCount: 4,
      },
    ]);
    console.log(`💡 Created ${ideas.length} ideas`);

    // Create forum posts
    const posts = await ForumPost.create([
      {
        title: 'How to apply for dhaRti Foundation seed funding?',
        content: 'Has anyone successfully applied for the dhaRti Foundation seed grant? What\'s the process like? Looking for tips on the application and pitch deck format. Our team is building a healthcare device and we think BioNEST would be a great fit.',
        category: 'general',
        tags: ['dhaRti', 'funding', 'incubation'],
        author: users[2]._id,
        votes: 15,
        pinned: true,
      },
      {
        title: 'Inter-IIT Tech Meet 2026 — Team Formation Thread',
        content: 'The Inter-IIT Tech Meet dates are out! We need to form teams for multiple problem statements. If you\'re interested in representing IIT Dharwad, drop your skills and preferred PS below. Coordinators will form balanced teams.',
        category: 'tech',
        tags: ['inter-iit', 'team', 'competition'],
        author: users[0]._id,
        votes: 24,
        pinned: true,
      },
      {
        title: 'Best approach for ML on microcontrollers?',
        content: 'Working on a TinyML project for my Bio-Vitals Monitor. Need to run inference on an ESP32. Has anyone tried TensorFlow Lite Micro or Edge Impulse? Looking for IIT Dharwad students with embedded ML experience.',
        category: 'tech',
        tags: ['TinyML', 'embedded', 'healthcare'],
        author: users[1]._id,
        votes: 18,
      },
      {
        title: 'E-Summit 2026: Pitch Prep Tips',
        content: 'E-Summit is around the corner. For those who\'ve pitched at IIT Dharwad\'s entrepreneurship events before — what format works best? Are judges more impressed by working demos or market research? Defence & Space sector tips especially welcome.',
        category: 'business',
        tags: ['E-Summit', 'pitch', 'entrepreneurship'],
        author: users[3]._id,
        votes: 12,
      },
    ]);
    console.log(`💬 Created ${posts.length} forum posts`);

    // Create announcements
    const anns = await Announcement.create([
      { title: '🚀 Bio-Vitals Monitor MVP is LIVE!', content: 'After 4 months of building, our low-cost bio-vitals monitor is now a working prototype. Heading to dhaRti BioNEST for incubation review next week!', type: 'launch', author: users[2]._id },
      { title: '🏆 E-Summit 2026 Registrations Open', content: 'IIT Dharwad E-Summit 2026 registrations are now live! Tracks: DefenceTech, CleanTech, AgriTech, EdTech. Submit your pitches by Aug 15. Prize pool: ₹5L.', type: 'event', author: users[0]._id },
      { title: '📢 dhaRti Foundation — New Seed Grant Cycle', content: 'dhaRti is accepting applications for the Spring 2026 seed grant cycle. Up to ₹10L per team. Deadline: April 30, 2026. Apply through the IIC portal.', type: 'funding', author: users[4]._id },
    ]);
    console.log(`📢 Created ${anns.length} announcements`);

    console.log('\n✅ Seed completed successfully!');
    console.log('\n📧 Login credentials (all passwords: password123):');
    users.forEach(u => console.log(`   ${u.email}`));
    
    process.exit(0);
  } catch (err) {
    console.error('❌ Seed error:', err);
    process.exit(1);
  }
};

seed();
