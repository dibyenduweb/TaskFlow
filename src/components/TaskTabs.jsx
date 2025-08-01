import { useState } from 'react';
import TaskItem from './TaskItem';
import TaskForm from './TaskForm';

export default function TaskTabs({ 
  tasks, 
  onAddTask, 
  onEditTask, 
  onDeleteTask, 
  onStatusChange,
  onDeleteCompleted 
}) {
  const [activeTab, setActiveTab] = useState('active');
  const [editingTask, setEditingTask] = useState(null);

  const filteredTasks = tasks.filter(task => task.status === activeTab);

  return (
    <div className="max-w-md mx-auto">
      {/* Add/Edit Task Form */}
      {editingTask ? (
        <TaskForm 
          task={editingTask}
          onSubmit={(data) => {
            onEditTask(editingTask._id, data);
            setEditingTask(null);
          }}
          onCancel={() => setEditingTask(null)}
        />
      ) : (
        <TaskForm 
          onSubmit={onAddTask}
        />
      )}

      {/* Status Tabs */}
      <div className="flex border-b mb-4">
        {['active', 'in-progress', 'completed'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2 font-medium ${
              activeTab === tab 
                ? 'border-b-2 border-blue-500 text-blue-600' 
                : 'text-gray-500'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Task List */}
      <div className="space-y-2">
        {filteredTasks.length === 0 ? (
          <p className="text-center text-gray-500 py-4">
            No {activeTab} tasks
          </p>
        ) : (
          filteredTasks.map(task => (
            <TaskItem
              key={task._id}
              task={task}
              onEdit={() => setEditingTask(task)}
              onDelete={onDeleteTask}
              onStatusChange={onStatusChange}
            />
          ))
        )}
      </div>

      {/* Delete Completed Button */}
      {activeTab === 'completed' && tasks.some(t => t.status === 'completed') && (
        <button
          onClick={() => {
            if (window.confirm('Delete all completed tasks?')) {
              onDeleteCompleted();
            }
          }}
          className="mt-4 w-full py-2 bg-red-100 text-red-600 rounded hover:bg-red-200"
        >
          Clear Completed Tasks
        </button>
      )}
    </div>
  );
}