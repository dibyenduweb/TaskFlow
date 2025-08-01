import { useState } from 'react';

export default function TaskForm({ task, onSubmit, onCancel }) {
  const [formData, setFormData] = useState(task || {
    title: '',
    priority: 'medium',
    startDate: '',
    endDate: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg border mb-4 mt-15">
      <input
        type="text"
        value={formData.title}
        onChange={(e) => setFormData({...formData, title: e.target.value})}
        placeholder="Task title"
        className="w-full p-2 border rounded mb-2"
        required
      />
      
      <div className="grid grid-cols-2 gap-2 mb-3">
        <select
          value={formData.priority}
          onChange={(e) => setFormData({...formData, priority: e.target.value})}
          className="p-2 border rounded"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        
        <input
          type="date"
          value={formData.startDate}
          onChange={(e) => setFormData({...formData, startDate: e.target.value})}
          className="p-2 border rounded"
        />
        
        <input
          type="date"
          value={formData.endDate}
          onChange={(e) => setFormData({...formData, endDate: e.target.value})}
          className="p-2 border rounded"
        />
      </div>
      
      <div className="flex justify-end space-x-2">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-3 py-1 bg-gray-200 rounded"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="px-3 py-1 bg-blue-500 text-white rounded"
        >
          {task ? 'Update' : 'Add'} Task
        </button>
      </div>
    </form>
  );
}