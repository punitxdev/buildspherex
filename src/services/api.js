import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
});

// Request interceptor to add JWT
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Authentication
export const loginUser = async (email, password) => {
  const response = await api.post('/auth/login', { email, password });
  if (response.data.token) localStorage.setItem('token', response.data.token);
  return response.data;
};

export const registerUser = async (userData) => {
  const response = await api.post('/auth/register', userData);
  if (response.data.token) localStorage.setItem('token', response.data.token);
  return response.data;
};

export const logoutUser = () => {
  localStorage.removeItem('token');
};

export const fetchCurrentUser = async () => {
  const response = await api.get('/auth/me');
  return response.data;
};

// Ideas
export const fetchIdeas = async (page = 1, limit = 50) => {
  const response = await api.get(`/ideas?page=${page}&limit=${limit}`);
  return response.data.data || response.data;
};

export const createIdea = async (ideaData) => {
  const response = await api.post('/ideas', ideaData);
  return response.data;
};

export const updateIdea = async (id, ideaData) => {
  const response = await api.put(`/ideas/${id}`, ideaData);
  return response.data;
};

export const deleteIdea = async (id) => {
  const response = await api.delete(`/ideas/${id}`);
  return response.data;
};

export const updateIdeaStatus = async (id, status) => {
  const response = await api.put(`/ideas/${id}/status`, { status });
  return response.data;
};

export const removeCollaborator = async (ideaId, userId) => {
  const response = await api.delete(`/ideas/${ideaId}/collaborators/${userId}`);
  return response.data;
};

// Forums
export const fetchForumPosts = async (page = 1, limit = 50) => {
  const response = await api.get(`/forums?page=${page}&limit=${limit}`);
  return response.data.data || response.data;
};

export const createForumPost = async (postData) => {
  const response = await api.post('/forums', postData);
  return response.data;
};

// Announcements
export const fetchAnnouncements = async () => {
  const response = await api.get('/announcements');
  return response.data;
};

export const createAnnouncement = async (annData) => {
  const response = await api.post('/announcements', annData);
  return response.data;
};

// Join Requests
export const fetchMyJoinRequests = async () => {
  const response = await api.get('/join-requests/my');
  return response.data;
};

export const createJoinRequest = async (ideaId, message) => {
  const response = await api.post('/join-requests', { ideaId, message });
  return response.data;
};

export const acceptJoinRequest = async (id) => {
  const response = await api.put(`/join-requests/${id}/accept`);
  return response.data;
};

export const rejectJoinRequest = async (id) => {
  const response = await api.put(`/join-requests/${id}/reject`);
  return response.data;
};

export default api;
