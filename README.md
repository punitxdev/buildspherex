<div align="center">

# 🚀 BuildSphereX

### _Where campus innovators connect, collaborate, and build_

<br>

[![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)](https://jwt.io/)

<br>

A full-stack **MERN** platform for student startups — pitch ideas, recruit collaborators, discuss tech, and build the future together. Featuring JWT authentication, real-time forums, idea boards with voting, and a premium glassmorphism UI.

<br>

> ⚠️ **Status:** Actively under development — this is a core initiative driving **startup culture** across campus!

---

</div>

<br>

## 🌟 The Vision

The university ecosystem is filled with brilliant minds, but finding co-founders, discussing technical roadblocks, and getting incubation support is incredibly fragmented. **BuildSphereX** bridges that gap — a centralized hub where students can pitch ideas, form teams, and bring innovations to life.

<br>

## 🎯 Core Features

<table>
<tr>
<td width="50%">

### 💡 Idea Hub
- **Post startup ideas** with descriptions & skill tags
- **Upvote/downvote** system to surface the best ideas
- **Join requests** — request to collaborate on ideas
- **Collaborator avatars** — see who's building what
- **Detailed idea pages** with comments & discussions

</td>
<td width="50%">

### 🗣️ Discussion Forums
- **Create forum threads** on any topic
- **Comment system** with nested discussions
- **Category tagging** — frameworks, hardware, pitching
- **Real-time engagement** — likes, replies, threads
- **Search & filter** through discussions

</td>
</tr>
<tr>
<td width="50%">

### 🔐 Authentication & Profiles
- **JWT-based** secure login & registration
- **Dynamic profiles** — skills, projects, academic info
- **Edit profile** — update your showcase anytime
- **Protected routes** — secure access control
- **Contact modal** — reach out to other builders

</td>
<td width="50%">

### 📢 Platform Features
- **Dashboard** — personalized feed & activity
- **Announcements** — hackathons, funding, tech meets
- **Skill tags** — MERN, AI/ML, Embedded Systems, etc.
- **About page** — platform mission & team
- **Responsive design** — works on all devices

</td>
</tr>
</table>

<br>

## 🛠️ Tech Stack

| Layer | Tech | Purpose |
|---|---|---|
| **Frontend** | React 19 + Vite 8 | Fast SPA with hot reload |
| **Routing** | React Router v7 | Client-side navigation |
| **State** | Context API | Global auth & app state |
| **HTTP** | Axios | API communication |
| **Icons** | Lucide React | Clean SVG icon library |
| **Styling** | Vanilla CSS | Premium glassmorphism UI |
| **Backend** | Node.js + Express.js | REST API server |
| **Database** | MongoDB + Mongoose | Document-based storage |
| **Auth** | JWT + bcrypt | Secure token authentication |

<br>

## 🚀 Quick Start

### Prerequisites
- **Node.js v20+** (uses modern ES modules)
- **MongoDB** running locally or a cloud URI

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
# In a new terminal, from project root
npm install
npm run dev
```

> Frontend runs on **http://localhost:5173** • Backend API on **http://localhost:5000**

<br>

## 📁 Project Structure

```
📦 BuildSphereX
 ┣ 📂 src/                        → React Frontend
 ┃  ┣ 📂 pages/
 ┃  ┃  ┣ 🏠 Home                  → Landing page
 ┃  ┃  ┣ 📊 Dashboard             → Personalized feed & activity
 ┃  ┃  ┣ 💡 Ideas / PostIdea      → Browse & submit startup ideas
 ┃  ┃  ┣ 🔍 IdeaDetail            → Full idea view with comments
 ┃  ┃  ┣ 🗣️ Forums / ForumThread  → Discussion boards
 ┃  ┃  ┣ 👤 Profile / EditProfile → User profiles
 ┃  ┃  ┣ 🔐 Login / Register      → Authentication
 ┃  ┃  ┗ ℹ️ About                  → Platform info
 ┃  ┣ 📂 components/              → Navbar, Footer, IdeaCard, VoteButton, etc.
 ┃  ┣ 📂 context/                 → Auth & app state (Context API)
 ┃  ┗ 📂 services/                → Axios API service layer
 ┃
 ┣ 📂 server/                     → Express Backend
 ┃  ┣ 📂 models/                  → User, Idea, ForumPost, Announcement, JoinRequest
 ┃  ┣ 📂 routes/                  → auth, ideas, forums, users, announcements, joinRequests
 ┃  ┣ 📂 middleware/              → JWT auth middleware
 ┃  ┣ 📂 config/                  → Database connection
 ┃  ┗ 🌱 seed.js                  → Database seeder script
 ┃
 ┗ 📄 vite.config.js              → Vite build configuration
```

<br>

## 🤝 Contributing

Since this is an active campus initiative, contributions are extremely welcome!

```bash
# Fork → Branch → Commit → Push → PR
git checkout -b feature/new-page
git commit -m "Add mentorship matching feature"
git push origin feature/new-page
```

Whether it's a new feature, a bug fix, or a UI improvement — your contribution is highly appreciated! 🙌

<br>

## 📄 License

Open source under the [MIT License](LICENSE).

<br>

<div align="center">

---

**Made with ❤️ by [punitxdev](https://github.com/punitxdev)**

_If you found this useful, give it a ⭐!_

</div>
