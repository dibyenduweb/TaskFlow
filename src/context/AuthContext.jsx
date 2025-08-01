import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const AuthContext = createContext();

// Add error handling for useAuth hook
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const user = localStorage.getItem('user');
        const token = localStorage.getItem('token');
        
        if (user && token) {
          setCurrentUser(JSON.parse(user));
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          
          // Optional: Verify token validity with backend
          // await axios.get('hhttps://taskflow-server-eight.vercel.app/api/validate-token');
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        // Clear invalid auth data
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        delete axios.defaults.headers.common['Authorization'];
        setCurrentUser(null);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const { data } = await axios.post('hhttps://taskflow-server-eight.vercel.app/api/login', { email, password });
      
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify({ email: data.email }));
      axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
      setCurrentUser({ email: data.email });
      
      toast.success('Logged in successfully');
      navigate('/');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
      throw error;
    }
  };

  const register = async (email, password) => {
    try {
      const { data } = await axios.post('hhttps://taskflow-server-eight.vercel.app/api/register', { email, password });
      
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify({ email: data.email }));
      axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
      setCurrentUser({ email: data.email });
      
      toast.success('Registered successfully');
      navigate('/');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    delete axios.defaults.headers.common['Authorization'];
    setCurrentUser(null);
    
    toast.success('Logged out successfully');
    navigate('/login');
  };

  const value = {
    currentUser,
    login,
    register,
    logout,
    loading  // Expose loading state if needed
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}