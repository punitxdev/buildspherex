import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import * as api from '../services/api';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [ideas, setIdeas] = useState([]);
  const [forumPosts, setForumPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [joinRequests, setJoinRequests] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  // Apply Theme
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  // Initialize Auth
  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const user = await api.fetchCurrentUser();
          setCurrentUser(user);
        } catch (err) {
          console.error("Token invalid or expired", err);
          localStorage.removeItem('token');
        }
      }
      setLoading(false);
    };
    initAuth();
  }, []);

  // Fetch initial data (can be optimized based on routes later)
  useEffect(() => {
    const loadData = async () => {
      try {
        const [fetchedIdeas, fetchedForums, fetchedAnns] = await Promise.all([
          api.fetchIdeas().catch(() => []),
          api.fetchForumPosts().catch(() => []),
          api.fetchAnnouncements().catch(() => []),
        ]);
        setIdeas(fetchedIdeas);
        setForumPosts(fetchedForums);
        setAnnouncements(fetchedAnns);
      } catch (err) {
        console.error("Error loading initial data", err);
      }
    };
    loadData();
  }, []);

  // Load user-specific data
  useEffect(() => {
    if (currentUser) {
      api.fetchMyJoinRequests().then(setJoinRequests).catch(console.error);
    } else {
      setJoinRequests([]);
    }
  }, [currentUser]);

  const login = async (email, password) => {
    const data = await api.loginUser(email, password);
    setCurrentUser(data.user);
  };

  const register = async (userData) => {
    const data = await api.registerUser(userData);
    setCurrentUser(data.user);
  };

  const logout = () => {
    api.logoutUser();
    setCurrentUser(null);
  };

  const addIdea = async (ideaData) => {
    const newIdea = await api.createIdea(ideaData);
    setIdeas([newIdea, ...ideas]);
    return newIdea;
  };

  const updateIdea = async (ideaId, data) => {
    const updated = await api.updateIdea(ideaId, data);
    setIdeas(ideas.map(i => i._id === ideaId ? updated : i));
  };

  const updateIdeaStatus = async (ideaId, status) => {
    await api.updateIdeaStatus(ideaId, status);
    setIdeas(ideas.map(i => i._id === ideaId ? { ...i, status } : i));
  };

  const deleteIdea = async (ideaId) => {
    await api.deleteIdea(ideaId);
    setIdeas(ideas.filter(i => i._id !== ideaId));
  };

  const removeCollaborator = async (ideaId, userId) => {
    await api.removeCollaborator(ideaId, userId);
    setIdeas(ideas.map(idea => 
      idea._id === ideaId 
        ? { ...idea, collaborators: idea.collaborators.filter(c => c._id !== userId) }
        : idea
    ));
  };

  const addForumPost = async (postData) => {
    const newPost = await api.createForumPost(postData);
    setForumPosts([newPost, ...forumPosts]);
    return newPost;
  };

  const addAnnouncement = async (annData) => {
    const newAnn = await api.createAnnouncement(annData);
    setAnnouncements([newAnn, ...announcements]);
    return newAnn;
  };

  const requestJoin = async (ideaId, message) => {
    const newReq = await api.createJoinRequest(ideaId, message);
    if (newReq) {
      // Refresh join requests if caching manually, but since this is for the user connecting -> we just optimistically update if needed.
      // Usually, the founder sees this request, so the requesting user doesn't need to append it to `joinRequests` (which is founder's incoming requests).
    }
  };

  const acceptRequest = async (requestId) => {
    await api.acceptJoinRequest(requestId);
    setJoinRequests(joinRequests.filter(r => r._id !== requestId));
    // We should ideally refetch the exact idea to update its collaborators, or do it locally
    const req = joinRequests.find(r => r._id === requestId);
    if (req) {
      setIdeas(ideas.map(idea => 
        idea._id === req.ideaId._id 
          ? { ...idea, collaborators: [...idea.collaborators, req.user] }
          : idea
      ));
    }
  };

  const rejectRequest = async (requestId) => {
    await api.rejectJoinRequest(requestId);
    setJoinRequests(joinRequests.filter(r => r._id !== requestId));
  };

  return (
    <AppContext.Provider value={{
      theme,
      toggleTheme,
      currentUser,
      ideas,
      forumPosts,
      users,
      joinRequests,
      announcements,
      loading,
      login,
      register,
      logout,
      addIdea,
      updateIdea,
      updateIdeaStatus,
      deleteIdea,
      removeCollaborator,
      addForumPost,
      addAnnouncement,
      requestJoin,
      acceptRequest,
      rejectRequest,
      // Placeholder for unimplemented
      voteIdea: () => {},
      voteForumPost: () => {},
      addCommentToIdea: () => {},
      addCommentToPost: () => {},
      toggleCollaborator: () => {},
      updateProfile: () => {},
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
}
