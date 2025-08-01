import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const TaskContext = createContext();

export function useTaskContext() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
}

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [activeTab, setActiveTab] = useState('Active');

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get('hhttps://taskflow-server-eight.vercel.app/api/tasks');
      setTasks(data);
    } catch (error) {
      toast.error('Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (task) => {
    try {
      const { data } = await axios.post('hhttps://taskflow-server-eight.vercel.app/api/tasks', task);
      setTasks(prev => [...prev, data]);
      toast.success('Task added successfully');
      return data;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add task');
      throw error;
    }
  };

  const updateTask = async (id, updates) => {
    try {
      const { data } = await axios.put(`hhttps://taskflow-server-eight.vercel.app/api/tasks/${id}`, updates);
      setTasks(prev => prev.map(t => t._id === id ? data : t));
      toast.success('Task updated successfully');
      return data;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update task');
      throw error;
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`hhttps://taskflow-server-eight.vercel.app/api/tasks/${id}`);
      setTasks(prev => prev.filter(t => t._id !== id));
      toast.success('Task deleted successfully');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete task');
      throw error;
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <TaskContext.Provider value={{
      tasks,
      loading,
      addTask,
      updateTask,
      deleteTask,
      fetchTasks,
      showModal,
      setShowModal,
      taskToEdit,
      setTaskToEdit,
      activeTab,
      setActiveTab
    }}>
      {children}
    </TaskContext.Provider>
  );
}