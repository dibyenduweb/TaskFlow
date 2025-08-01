import { useState } from 'react';
import { useTaskContext } from '../context/TaskContext';
import { PencilIcon, TrashIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

export default function TaskItem({ task }) {
  const { deleteTask, setTaskToEdit, setShowModal, updateTask } = useTaskContext();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [remarks, setRemarks] = useState('');

  const handleEdit = () => {
    setTaskToEdit(task);
    setShowModal(true);
  };

  const handleDelete = async () => {
    try {
      await deleteTask(task._id);
      setShowDeleteModal(false);
    } catch (error) {
      toast.error('Failed to delete task');
    }
  };

  const handleComplete = async () => {
    if (!remarks.trim()) {
      toast.error('Please add remarks before completing');
      return;
    }

    try {
      await updateTask(task._id, { 
        status: 'Completed',
        remarks 
      });
      setShowCompleteModal(false);
      setRemarks('');
      toast.success('Task marked as completed!');
    } catch (error) {
      toast.error('Failed to complete task');
    }
  };

  const priorityColors = {
    Low: 'bg-green-100 text-green-800',
    Medium: 'bg-yellow-100 text-yellow-800',
    High: 'bg-red-100 text-red-800'
  };

  return (
    <>
      <div className="bg-white p-4 rounded-lg shadow mb-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium text-lg">{task.title}</h3>
            <div className="flex items-center space-x-4 mt-2">
              <span className={`px-2 py-1 text-xs rounded-full ${priorityColors[task.priority]}`}>
                {task.priority}
              </span>
              <span className="text-sm text-gray-500">
                Due: {new Date(task.dueDate).toLocaleDateString()}
              </span>
              <span className="text-sm text-gray-500">
                Status: {task.status}
              </span>
              {task.remarks && (
                <span className="text-sm text-gray-500">
                  Remarks: {task.remarks}
                </span>
              )}
            </div>
          </div>
          <div className="flex space-x-2">
            {task.status === 'In-progress' && (
              <button
                onClick={() => setShowCompleteModal(true)}
                className="p-1 text-gray-500 hover:text-green-600"
                aria-label="Mark as complete"
              >
                <CheckCircleIcon className="h-5 w-5" />
              </button>
            )}
            <button
              onClick={handleEdit}
              className="p-1 text-gray-500 hover:text-blue-600"
              aria-label="Edit task"
            >
              <PencilIcon className="h-5 w-5" />
            </button>
            <button
              onClick={() => setShowDeleteModal(true)}
              className="p-1 text-gray-500 hover:text-red-600"
              aria-label="Delete task"
            >
              <TrashIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full overflow-hidden">
            <div className="p-6">
              <div className="flex flex-col items-center text-center">
                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                  <ExclamationTriangleIcon 
                    className="h-6 w-6 text-red-600" 
                    aria-hidden="true" 
                  />
                </div>
                <h3 className="mt-3 text-lg font-medium text-gray-900">
                  Delete Task?
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Are you sure you want to delete "{task.title}"? This action cannot be undone.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Complete Task Modal */}
      {showCompleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full overflow-hidden">
            <div className="p-6">
              <div className="flex flex-col items-center text-center">
                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                  <CheckCircleIcon 
                    className="h-6 w-6 text-green-600" 
                    aria-hidden="true" 
                  />
                </div>
                <h3 className="mt-3 text-lg font-medium text-gray-900">
                  Complete Task
                </h3>
                <div className="mt-4 w-full">
                  <label className="block text-sm font-medium text-gray-700 mb-1 text-left">
                    Add Remarks
                  </label>
                  <textarea
                    value={remarks}
                    onChange={(e) => setRemarks(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    rows={3}
                    placeholder="Enter completion remarks..."
                    required
                  />
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => {
                  setShowCompleteModal(false);
                  setRemarks('');
                }}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleComplete}
                className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Mark Complete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}