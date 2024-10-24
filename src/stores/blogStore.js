import { create } from 'zustand';
import axios from 'axios';

const useBlogStore = create((set) => ({
  posts: [],
  isLoading: false,
  error: null,

  fetchPosts: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get('http://localhost:5000/api/posts', {
        withCredentials: true
      });
      console.log('API Response:', response.data);
      if (Array.isArray(response.data)) {
        set({ posts: response.data, isLoading: false });
      } else {
        console.error('API did not return an array:', response.data);
        set({ error: 'Invalid data format from API', isLoading: false, posts: [] });
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
      set({ error: error.response?.data?.message || 'An error occurred', isLoading: false, posts: [] });
    }
  },

  deletePost: async (id) => {
    console.log('Attempting to delete post with ID:', id);
    try {
      await axios.delete(`http://localhost:5000/api/posts/${id}`, {
        withCredentials: true
      });
      // Update posts state by filtering out the deleted post
      set((state) => ({
        posts: state.posts.filter(post => post._id !== id)
      }));
    } catch (error) {
      console.error('Error deleting post:', error);
      const errorMessage = error.response?.data?.message || 'An error occurred while deleting the post';
      if (error.response && error.response.status === 401) {
        set({ error: 'You are not authorized to delete this post' });
      } else {
        set({ error: errorMessage });
      }
    }
  }}));

export default useBlogStore;
