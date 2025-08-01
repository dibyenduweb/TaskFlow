import { useState } from 'react';
import TaskItem from './TaskItem';
import CompletedTasks from './CompletedTasks';
import { useTasks } from '../hooks/useTasks';

const TaskList = () => {
  const { tasks, loading, error, addTask, updateTask, deleteTask, completeTask } = useTasks();
  const [newTask, setNewTask] = useState({
    title: '',
    priority: 'medium',
    dueDate: '',
    startDate: '',
    endDate: ''
  });

  const handleAddTask = (e) => {
    e.preventDefault();
    if (newTask.title.trim()) {
      addTask({
        title: newTask.title,
        priority: newTask.priority,
        ...(newTask.dueDate && { dueDate: new Date(newTask.dueDate) }),
        ...(newTask.startDate && { startDate: new Date(newTask.startDate) }),
        ...(newTask.endDate && { endDate: new Date(newTask.endDate) })
      });
      setNewTask({
        title: '',
        priority: 'medium',
        dueDate: '',
        startDate: '',
        endDate: ''
      });
    }
  };

  const activeTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <form onSubmit={handleAddTask} className="mb-6 bg-white p-4 rounded-lg shadow">
        <div className="space-y-3">
          <input
            type="text"
            value={newTask.title}
            onChange={(e) => setNewTask({...newTask, title: e.target.value})}
            placeholder="Add a new task..."
            className="w-full p-2 border rounded"
            required
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            <select
              value={newTask.priority}
              onChange={(e) => setNewTask({...newTask, priority: e.target.value})}
              className="p-2 border rounded"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
            </select>
            
            <input
              type="datetime-local"
              value={newTask.dueDate}
              onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})}
              className="p-2 border rounded"
              placeholder="Due Date"
            />
            
            <input
              type="datetime-local"
              value={newTask.startDate}
              onChange={(e) => setNewTask({...newTask, startDate: e.target.value})}
              className="p-2 border rounded"
              placeholder="Start Date"
            />
            
            <input
              type="datetime-local"
              value={newTask.endDate}
              onChange={(e) => setNewTask({...newTask, endDate: e.target.value})}
              className="p-2 border rounded"
              placeholder="End Date"
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Add Task
          </button>
        </div>
      </form>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Active Tasks</h2>
        {loading && <p>Loading tasks...</p>}
        {error && <p className="text-red-500">{error}</p>}
        
        <ul className="space-y-3">
          {activeTasks.map(task => (
            <TaskItem
              key={task._id}
              task={task}
              onUpdate={updateTask}
              onDelete={deleteTask}
              onComplete={completeTask}
            />
          ))}
        </ul>

        <CompletedTasks tasks={completedTasks} />
      </div>
    </div>
  );
};

export default TaskList;