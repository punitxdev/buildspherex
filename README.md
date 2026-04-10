<div align="center">

# BuildSphereX

### Where campus innovators connect, collaborate, and build.

<br>

[![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)](https://jwt.io/)

<br>

A full-stack **MERN** platform designed for student startups. The platform facilitates idea pitching, collaborator recruitment, technical discussion, and collaborative building. Features include robust JWT authentication, active forum channels, idea boards with voting mechanics, and a polished user interface.

<br>

> **Status:** Actively under development. This platform serves as a core initiative driving startup culture across the campus network.

---

</div>

<br>

## The Vision

The university ecosystem inherently contains driven technical executioner profiles, but sourcing co-founders, iterating through technical roadblocks, and attaining incubation support can become highly fragmented. **BuildSphereX** functions to bridge that gap — establishing a centralized digital hub where active students can pitch technical concepts, assemble execution teams, and deploy functional innovations.

<br>

## Core Features

<table>
<tr>
<td width="50%">

### Idea Hub
- **Post startup ideas** combined with technical descriptions and integrated skill tags.
- **Vote validation system** structured to optimally surface validated concepts.
- **Join requests** permitting active collaboration requests on existing ideas.
- **Collaborator presentation** mapping identifying active component contributors.
- **Detailed structural view** allowing comments and integrated discussions.

</td>
<td width="50%">

### Discussion Forums
- **Create forum threads** designated for explicit domain topics.
- **Comment system** designed around nested hierarchical discussion paths.
- **Category tagging** supporting framework, hardware, and deployment channels.
- **Active engagement models** utilizing likes, replies, and threaded tracking.
- **Search and filter** operations across historical aggregated discussions.

</td>
</tr>
<tr>
<td width="50%">

### Authentication & Profiles
- **JWT-based** integration securing login and account registration phases.
- **Dynamic profiles** supporting technical skills, project links, and academic history.
- **Profile operations** permitting continual update modifications dynamically.
- **Protected routing logic** guaranteeing controlled secure component access.
- **Contact integrations** enabling interaction with verified network builders.

</td>
<td width="50%">

### Platform Operations
- **Aggregated Dashboard** yielding personalized activity mappings and targeted feeds.
- **Announcements pipeline** spanning hackathons, technical meets, and networking options.
- **Skill mappings** such as MERN, AI/ML, and Embedded System tagging protocols.
- **Responsive deployment architecture** mapping rendering cleanly across standard mobile devices.

</td>
</tr>
</table>

<br>

## Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Frontend** | React 19 + Vite 8 | Single Page Application framework emphasizing fast execution protocols. |
| **Routing** | React Router v7 | Structured client-side navigational pathing. |
| **State** | Context API | Distributed global state representation encompassing authentication arrays. |
| **HTTP** | Axios | Dedicated interface for Promise-based structured API communication. |
| **Icons** | Lucide React | Uniform SVG icon representation library mapping cleanly to components. |
| **Styling** | Vanilla CSS | Comprehensive variable-driven custom styled interface mechanics. |
| **Backend** | Node.js + Express.js | Core scalable REST application programming interface framework. |
| **Database** | MongoDB + Mongoose | Active document-oriented hierarchical cloud storage integration. |
| **Authentication** | JWT + bcrypt | Immutable token-based secure authorization protocols. |

<br>

## Quick Start

### Prerequisites
- **Node.js v20+** (Required for ES Module runtime dependencies).
- **MongoDB** (Executing via local host daemon or defined URI remote cluster).

### 1. Clone

```bash
git clone https://github.com/punitxdev/buildspherex.git
cd buildspherex
```

### 2. Start Backend

```bash
cd server
npm install
npm run dev
```

### 3. Start Frontend

```bash
# In a new terminal context, starting from root path:
npm install
npm run dev
```

> **Frontend port binding:** http://localhost:5173 • **Backend API port binding:** http://localhost:5000

<br>

## Project Structure

```text
BuildSphereX
 ├── src/                        → Primary React Frontend Runtime
 │  ├── pages/
 │  │  ├── Home                  → Initial landing presentation layout
 │  │  ├── Dashboard             → Aggregated personalized feed mapping
 │  │  ├── Ideas / PostIdea      → System hub for evaluating concepts and submitting
 │  │  ├── IdeaDetail            → Individual focus container with attached commentary
 │  │  ├── Forums / ForumThread  → Threaded operational domain discussion maps
 │  │  ├── Profile / EditProfile → Central presentation for user configurations
 │  │  ├── Login / Register      → Authorization portals
 │  │  └── About                 → General structural platform overview
 │  ├── components/              → Modular encapsulated component segments
 │  ├── context/                 → Root-level global State mapping (Context API)
 │  └── services/                → Functional HTTP protocol endpoints architecture
 │
 ├── server/                     → Primary Express Backend Runtime
 │  ├── models/                  → Standard Document mappings via Mongoose schema
 │  ├── routes/                  → Network routing controllers (auth, forums, ideas)
 │  ├── middleware/              → Request interception routines securing JWT tokens
 │  ├── config/                  → Active datastream connections
 │  └── seed.js                  → Integrated database initialization testing script
 │
 └── vite.config.js              → Executable compilation variables
```

<br>

## Contributing

As this platform operates as an active internal initiative, development contributions are heavily supported and encouraged.

```bash
git checkout -b feature/new-page
git commit -m "Initialize structural mentorship mapping feature"
git push origin feature/new-page
```

Contributions covering new iterations, system stabilization implementations, and component improvements are appreciated.

<br>
