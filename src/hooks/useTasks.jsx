import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

export function useTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { currentUser } = useAuth();

  useEffect(() => {
    if (currentUser) {
      fetchTasks();
    } else {
      setTasks([]); // Clear tasks when user logs out
    }
  }, [currentUser]);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('http://localhost:5000/api/tasks', {
        headers: {
          'Authorization': `Bearer ${await currentUser.getIdToken()}`
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setTasks(data);
    } catch (err) {
      setError(err.message);
      console.error('Failed to fetch tasks:', err);
    } finally {
      setLoading(false);
    }
  };

 const addTask = async (task) => {
  try {
    const response = await fetch('http://localhost:5000/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${await currentUser.getIdToken()}`
      },
      body: JSON.stringify(task)
    });
    const newTask = await response.json();
    setTasks([...tasks, newTask]);
  } catch (err) {
    setError(err.message);
  }
};

const updateTask = async (id, updates) => {
  try {
    const response = await fetch(`http://localhost:5000/api/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${await currentUser.getIdToken()}`
      },
      body: JSON.stringify(updates)
    });
    const updatedTask = await response.json();
    setTasks(tasks.map(task => task._id === id ? updatedTask : task));
  } catch (err) {
    setError(err.message);
  }
};



  const deleteTask = async (id) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`http://localhost:5000/api/tasks/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${await currentUser.getIdToken()}`
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setTasks(prevTasks => prevTasks.filter(task => task._id !== id));
    } catch (err) {
      setError(err.message);
      console.error('Failed to delete task:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

const completeTask = async (id, remarks) => {
  try {
    const response = await fetch(`http://localhost:5000/api/tasks/${id}/complete`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${await currentUser.getIdToken()}`
      },
      body: JSON.stringify({ remarks })
    });
    const updatedTask = await response.json();
    setTasks(tasks.map(task => task._id === id ? updatedTask : task));
  } catch (err) {
    setError(err.message);
  }
};

// Add these new methods
const updateTaskStatus = async (id, status, remarks) => {
  try {
    const response = await fetch(`http://localhost:5000/api/tasks/${id}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${await currentUser.getIdToken()}`
      },
      body: JSON.stringify({ status, remarks })
    });
    const updatedTask = await response.json();
    setTasks(tasks.map(task => task._id === id ? updatedTask : task));
  } catch (err) {
    setError(err.message);
    throw err;
  }
};

const deleteCompletedTasks = async () => {
  try {
    await fetch('http://localhost:5000/api/tasks/completed', {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${await currentUser.getIdToken()}`
      }
    });
    setTasks(tasks.filter(task => task.status !== 'completed'));
  } catch (err) {
    setError(err.message);
    throw err;
  }
};


// Add this to the returned object
return { 
  tasks, 
  loading, 
  error, 
  addTask, 
  updateTask, 
  deleteTask,
  completeTask,
  refetch: fetchTasks,
  updateTaskStatus,
  deleteCompletedTasks

};
}