import { useTaskContext } from '../context/TaskContext';
import { useAuth } from '../context/AuthContext';
import Modal from '../components/Modal';
import TaskForm from '../components/TaskForm';
import TaskItem from '../components/TaskItem';

export default function Home() {
  const { currentUser, logout } = useAuth();
  const { 
    tasks = [], // Default to empty array if undefined
    loading, 
    showModal, 
    setShowModal, 
    activeTab, 
    setActiveTab,
    setTaskToEdit
  } = useTaskContext();

  const handleAddTask = () => {
    setTaskToEdit(null);
    setShowModal(true);
  };

  // Safely filter tasks
  const filteredTasks = Array.isArray(tasks) 
    ? tasks.filter(task => task.status === activeTab)
    : [];

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-900">TaskFlow</h1>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-500">Hello, {currentUser?.email}</span>
            <button 
              onClick={logout}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="mb-6">
          <h2 className="text-lg font-medium text-gray-900 mb-2">Task title</h2>
          <button
            onClick={handleAddTask}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Add Task
          </button>
        </div>

        <div className="mb-6">
          <div className="flex border-b border-gray-200">
            {['Active', 'In-progress', 'Completed'].map((tab) => (
              <button
                key={tab}
                className={`px-4 py-2 text-sm font-medium ${
                  activeTab === tab
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : filteredTasks.length === 0 ? (
          <div className="bg-white p-8 rounded-lg shadow text-center">
            <p className="text-gray-500">No {activeTab.toLowerCase()} tasks</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredTasks.map(task => (
              <TaskItem key={task._id} task={task} />
            ))}
          </div>
        )}

        <Modal show={showModal} onClose={() => setShowModal(false)}>
          <TaskForm onClose={() => setShowModal(false)} />
        </Modal>
      </main>
    </div>
  );
}