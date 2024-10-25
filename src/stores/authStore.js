import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import Cookies from 'js-cookie';
import axios from 'axios';

// Create axios instance with default config
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
  interceptors: {
    request: (config) => {
      
      return config;
    },
    response: (response) => {
      
      return response;
    }
  }
});


const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      users: [],
      isLoading: false,
      error: null,
      isAuthorized: false,

      setUser: (userData) => {
       
        set({
          user: userData.user,
          isAuthorized: true,
          error: null,
        });
      },

      setLoading: (value) => {
        set({ isLoading: value });
      },

      
      initializeAuth: () => {
        const userStr = Cookies.get('user');
        if (userStr) {
          try {
            const user = JSON.parse(userStr);
            set({ user, isAuthorized: true, error: null });
          } catch (error) {
            
            get().logout();
          }
        }
      },

      
      authorizeDashboardAccess: () => {
        return get().isAuthorized;
      },

      getUserRole: () => {
        return get().user?.role;
      },

      // Updated fetchUsers function with better error handling and state management
      fetchUsers: async () => {
        set({ isLoading: true, error: null });
        try {
          const response = await api.get('/users');
          
          // Validate the response data
          if (response.data && Array.isArray(response.data.users)) {
            
            set({ 
              users: response.data.users,
              isLoading: false,
              error: null
            });
          } else if (Array.isArray(response.data)) {
            // If the API directly returns the users array
            set({ 
              users: response.data,
              isLoading: false,
              error: null
            });
          } else {
            throw new Error('Invalid data format received from server');
          }
        } catch (error) {
         
          set({
            error: error.response?.data?.message || error.message || 'Failed to fetch users',
            isLoading: false,
            users: [] 
          });
          throw error; 
        }
      },

      // Add a new user to the users array
      addUser: (newUser) => {
        set((state) => ({
          users: [...state.users, newUser]
        }));
      },

      // Update a user in the users array
      updateUser: (updatedUser) => {
        set((state) => ({
          users: state.users.map(user => 
            user.id === updatedUser.id ? updatedUser : user
          )
        }));
      },

      // Remove a user from the users array
      removeUser: (userId) => {
        set((state) => ({
          users: state.users.filter(user => user.id !== userId)
        }));
      },

      
      clearUsers: () => {
        set({ users: [] });
      },

      // Logout user
     
      logout: async () => {
        try {
          
          
          
          
          
          const response = await api.get('/auth/logout', {
            withCredentials: true
          });
          
          
          
          // Clear local storage and state
          Cookies.remove('user', { path: '/' });
          set({
            user: null,
            isAuthorized: false,
            error: null,
          });
          
          
        } catch (error) {
          
          
          set({
            user: null,
            isAuthorized: false,
            error: null,
          });
        }
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
     
    }
  )
);




export default useAuthStore;