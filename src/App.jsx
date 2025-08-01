import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';
import { Toaster } from 'react-hot-toast';
import { useTasks } from './hooks/useTasks';
import TaskTabs from './components/TaskTabs';

function AppContent() {
  const { tasks, addTask, updateTask, deleteTask, updateTaskStatus, deleteCompletedTasks } = useTasks();

  return (
    <div className="min-h-screen bg-gray-50">
      <TaskTabs
        tasks={tasks}
        onAddTask={(task) => addTask({ ...task, status: 'active' })}
        onEditTask={updateTask}
        onDeleteTask={deleteTask}
        onStatusChange={updateTaskStatus}
        onDeleteCompleted={deleteCompletedTasks}
      />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <Toaster position="top-right" />
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route 
              path="/" 
              element={
                <PrivateRoute>
                  <AppContent />
                </PrivateRoute>
              } 
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;