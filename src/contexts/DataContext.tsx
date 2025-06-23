import React, { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { projectsAPI, tasksAPI, type Project, type Task } from '@/services/api';
import { useAuth } from './AuthContext';
import { toast } from 'sonner';

interface DataContextType {
  projects: Project[];
  tasks: Task[];
  isLoading: boolean;
  refreshProjects: () => Promise<void>;
  refreshTasks: () => Promise<void>;
  createProject: (data: Partial<Project>) => Promise<boolean>;
  updateProject: (id: number, data: Partial<Project>) => Promise<boolean>;
  deleteProject: (id: number) => Promise<boolean>;
  createTask: (data: Partial<Task>) => Promise<boolean>;
  updateTask: (id: number, data: Partial<Task>) => Promise<boolean>;
  deleteTask: (id: number) => Promise<boolean>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

interface DataProviderProps {
  children: ReactNode;
}

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      refreshProjects();
      refreshTasks();
    }
  }, [isAuthenticated]);

  const refreshProjects = async () => {
    try {
      setIsLoading(true);
      const response = await projectsAPI.getAll();
      setProjects(response.data.projects);
    } catch (error) {
      console.error('Failed to fetch projects:', error);
      toast.error("Error", {
        description: "Failed to load projects",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const refreshTasks = async () => {
    try {
      setIsLoading(true);
      const response = await tasksAPI.getAll();
      setTasks(response.data.tasks);
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
      toast.error("Error", {
        description: "Failed to load tasks",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const createProject = async (data: Partial<Project>): Promise<boolean> => {
    try {
      const response = await projectsAPI.create(data);
      setProjects(prev => [...prev, response.data.project]);
      toast.success("Success", {
        description: "Project created successfully",
      });
      return true;
    } catch (error: any) {
      console.error('Failed to create project:', error);
      toast.error("Error", {
        description: error.response?.data?.message || "Failed to create project",
        variant: "destructive",
      });
      return false;
    }
  };

  const updateProject = async (id: number, data: Partial<Project>): Promise<boolean> => {
    try {
      const response = await projectsAPI.update(id, data);
      setProjects(prev => prev.map(p => p.id === id ? response.data.project : p));
      toast.success("Success", {
        description: "Project updated successfully",
      });
      return true;
    } catch (error: any) {
      console.error('Failed to update project:', error);
      toast.error("Error", {
        description: error.response?.data?.message || "Failed to update project",
        variant: "destructive",
      });
      return false;
    }
  };

  const deleteProject = async (id: number): Promise<boolean> => {
    try {
      await projectsAPI.delete(id);
      setProjects(prev => prev.filter(p => p.id !== id));
      setTasks(prev => prev.filter(t => t.project_id !== id));
      toast("Success", {
        description: "Project deleted successfully",
      });
      return true;
    } catch (error: any) {
      console.error('Failed to delete project:', error);
      toast.error("Error", {
        description: error.response?.data?.message || "Failed to delete project",
        variant: "destructive",
      });
      return false;
    }
  };

  const createTask = async (data: Partial<Task>): Promise<boolean> => {
    try {
      const response = await tasksAPI.create(data);
      setTasks(prev => [...prev, response.data.task]);
      toast.success("Success", {
        description: "Task created successfully",
      });
      return true;
    } catch (error: any) {
      console.error('Failed to create task:', error);
      toast.error("Error", {
        description: error.response?.data?.message || "Failed to create task",
        variant: "destructive",
      });
      return false;
    }
  };

  const updateTask = async (id: number, data: Partial<Task>): Promise<boolean> => {
    try {
      const response = await tasksAPI.update(id, data);
      setTasks(prev => prev.map(t => t.id === id ? response.data.task : t));
      toast.success("Success", {
        description: "Task updated successfully",
      });
      return true;
    } catch (error: any) {
      console.error('Failed to update task:', error);
      toast.error("Error", {
        description: error.response?.data?.message || "Failed to update task",
        variant: "destructive",
      });
      return false;
    }
  };

  const deleteTask = async (id: number): Promise<boolean> => {
    try {
      await tasksAPI.delete(id);
      setTasks(prev => prev.filter(t => t.id !== id));
      toast.success("Success", {
        description: "Task deleted successfully",
      });
      return true;
    } catch (error: any) {
      console.error('Failed to delete task:', error);
      toast.error("Error", {
        description: error.response?.data?.message || "Failed to delete task",
        variant: "destructive",
      });
      return false;
    }
  };

  const value = {
    projects,
    tasks,
    isLoading,
    refreshProjects,
    refreshTasks,
    createProject,
    updateProject,
    deleteProject,
    createTask,
    updateTask,
    deleteTask,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
