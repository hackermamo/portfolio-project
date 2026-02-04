import { create } from 'zustand';

// Auth Store for admin authentication
export const useAuthStore = create((set) => ({
  token: localStorage.getItem('adminToken') || null,
  isAuthenticated: !!localStorage.getItem('adminToken'),
  
  setAuth: (token) => {
    if (token) {
      localStorage.setItem('adminToken', token);
    } else {
      localStorage.removeItem('adminToken');
    }
    set({ token, isAuthenticated: !!token });
  },
  
  logout: () => {
    localStorage.removeItem('adminToken');
    set({ token: null, isAuthenticated: false });
  },
}));

// Portfolio Data Store
export const usePortfolioStore = create((set) => ({
  aboutData: null,
  skills: [],
  projects: [],
  experience: [],
  education: [],
  contactInfo: null,
  
  setAboutData: (data) => set({ aboutData: data }),
  setSkills: (skills) => set({ skills }),
  setProjects: (projects) => set({ projects }),
  setExperience: (experience) => set({ experience }),
  setEducation: (education) => set({ education }),
  setContactInfo: (info) => set({ contactInfo: info }),
}));
