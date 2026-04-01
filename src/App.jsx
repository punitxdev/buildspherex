import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Forums from './pages/Forums';
import ForumThread from './pages/ForumThread';
import Ideas from './pages/Ideas';
import IdeaDetail from './pages/IdeaDetail';
import PostIdea from './pages/PostIdea';
import Profile from './pages/Profile';
import About from './pages/About';
import EditProfile from './pages/EditProfile';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forums" element={<Forums />} />
            <Route path="/forums/:postId" element={<ForumThread />} />
            <Route path="/ideas" element={<Ideas />} />
            <Route path="/ideas/:ideaId" element={<IdeaDetail />} />
            <Route path="/post-idea" element={<PostIdea />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/about" element={<About />} />
            <Route path="/edit-profile" element={<EditProfile />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </AppProvider>
  );
}
