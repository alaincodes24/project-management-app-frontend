import React, { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { authAPI, type User, type LoginData, type RegisterData } from '@/services/api';
import { toast } from 'sonner';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (data: LoginData) => Promise<boolean>;
  register: (data: RegisterData) => Promise<boolean>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = !!user;

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('auth_token');
      if (token) {
        try {
          await refreshUser();
        } catch (error) {
          console.error('Failed to refresh user:', error);
          localStorage.removeItem('auth_token');
          localStorage.removeItem('user_data');
        }
      }
      setIsLoading(false);
    };

    initAuth();
  }, []);

  const login = async (data: LoginData): Promise<boolean> => {
    try {
      setIsLoading(true);
      const response = await authAPI.login(data);
      const { token, user: userData } = response.data.payload;
      
      localStorage.setItem('auth_token', token);
      localStorage.setItem('user_data', JSON.stringify(userData));
      setUser(userData);
      
      toast.success("Welcome back!", {
        description: (
          <span className="text-black">
            You have successfully logged in.
          </span>
        ),
      });
      
      return true;
    } catch (error: any) {
      console.error('Login error:', error);
      toast.error("Login failed", {
        description: (
          <span className="text-black">
            { error.response?.data?.message || "Invalid credentials" }
          </span>
        ),
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: RegisterData): Promise<boolean> => {
    try {
      setIsLoading(true);
      const response = await authAPI.register(data);
      const { token, user: userData } = response.data;
      
      localStorage.setItem('auth_token', token);
      localStorage.setItem('user_data', JSON.stringify(userData));
      setUser(userData);
      
      toast.success("Account created!", {
        description: (
          <span className="text-black">
            Welcome to the task management system.
          </span>
        ),
      });
      
      return true;
    } catch (error: any) {
      console.error('Registration error:', error);
      toast.error("Registration failed", {
        description: (
          <span className="text-black">
            { error.response?.data?.message || "Failed to create account" }
          </span>
        ),
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await authAPI.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_data');
      setUser(null);
      toast.success("Logged out",  {
        description: (
          <span className="text-black">
            You have been successfully logged out.
          </span>
        ),
      });
    }
  };

  const refreshUser = async () => {
    try {
      const response = await authAPI.getProfile();
      setUser(response.data);
    } catch (error) {
      console.error('Failed to refresh user:', error);
      throw error;
    }
  };

  const value = {
    user,
    isLoading,
    isAuthenticated,
    login,
    register,
    logout,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
