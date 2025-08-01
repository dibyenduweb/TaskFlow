// import { useState } from 'react';
// import { PencilIcon, TrashIcon, CheckIcon, ClockIcon } from '@heroicons/react/24/outline';

// const priorityColors = {
//   low: 'bg-blue-100 text-blue-800',
//   medium: 'bg-green-100 text-green-800',
//   high: 'bg-yellow-100 text-yellow-800',
//   urgent: 'bg-red-100 text-red-800'
// };

// export default function TaskItem({ task, onUpdate, onDelete, onComplete }) {
//   const [isEditing, setIsEditing] = useState(false);
//   const [editedTask, setEditedTask] = useState({ ...task });
//   const [showCompleteForm, setShowCompleteForm] = useState(false);
//   const [remarks, setRemarks] = useState('');

//   const handleComplete = () => {
//     onComplete(task._id, remarks);
//     setShowCompleteForm(false);
//     setRemarks('');
//   };

//   const formatDate = (dateString) => {
//     if (!dateString) return '';
//     const date = new Date(dateString);
//     return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
//   };

//   return (
//     <li className="border rounded-lg p-4 mb-2 hover:shadow-md transition-shadow">
//       {isEditing ? (
//         <div className="space-y-3">
//           <input
//             type="text"
//             value={editedTask.title}
//             onChange={(e) => setEditedTask({...editedTask, title: e.target.value})}
//             className="w-full p-2 border rounded"
//           />
          
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
//             <select
//               value={editedTask.priority}
//               onChange={(e) => setEditedTask({...editedTask, priority: e.target.value})}
//               className="p-2 border rounded"
//             >
//               <option value="low">Low</option>
//               <option value="medium">Medium</option>
//               <option value="high">High</option>
//               <option value="urgent">Urgent</option>
//             </select>
            
//             <input
//               type="datetime-local"
//               value={editedTask.dueDate ? new Date(editedTask.dueDate).toISOString().slice(0, 16) : ''}
//               onChange={(e) => setEditedTask({...editedTask, dueDate: e.target.value})}
//               className="p-2 border rounded"
//             />
           
//             <input
//               type="datetime-local"
//               value={editedTask.startDate ? new Date(editedTask.startDate).toISOString().slice(0, 16) : ''}
//               onChange={(e) => setEditedTask({...editedTask, startDate: e.target.value})}
//               className="p-2 border rounded"
//               placeholder="Start Date"
//             />
            
//             <input
//               type="datetime-local"
//               value={editedTask.endDate ? new Date(editedTask.endDate).toISOString().slice(0, 16) : ''}
//               onChange={(e) => setEditedTask({...editedTask, endDate: e.target.value})}
//               className="p-2 border rounded"
//               placeholder="End Date"
//             />
//           </div>
          
//           <div className="flex justify-end space-x-2">
//             <button
//               onClick={() => setIsEditing(false)}
//               className="px-3 py-1 bg-gray-200 rounded"
//             >
//               Cancel
//             </button>
//             <button
//               onClick={() => {
//                 onUpdate(task._id, editedTask);
//                 setIsEditing(false);
//               }}
//               className="px-3 py-1 bg-blue-500 text-white rounded"
//             >
//               Save
//             </button>
//           </div>
//         </div>
//       ) : showCompleteForm ? (
//         <div className="space-y-3">
//           <textarea
//             value={remarks}
//             onChange={(e) => setRemarks(e.target.value)}
//             placeholder="Add remarks (optional)"
//             className="w-full p-2 border rounded"
//             rows="2"
//           />
//           <div className="flex justify-end space-x-2">
//             <button
//               onClick={() => setShowCompleteForm(false)}
//               className="px-3 py-1 bg-gray-200 rounded"
//             >
//               Cancel
//             </button>
//             <button
//               onClick={handleComplete}
//               className="px-3 py-1 bg-green-500 text-white rounded"
//             >
//               Mark Complete
//             </button>
//           </div>
//         </div>
//       ) : (
//         <div className="flex flex-col space-y-2">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-3">
//               <span className={`${task.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}>
//                 {task.title}
//               </span>
//             </div>
//             <div className="flex space-x-2">
//               {!task.completed && (
//                 <>
//                   <button
//                     onClick={() => setIsEditing(true)}
//                     className="text-blue-500 hover:text-blue-700"
//                   >
//                     <PencilIcon className="h-5 w-5" />
//                   </button>
//                   <button
//                     onClick={() => setShowCompleteForm(true)}
//                     className="text-green-500 hover:text-green-700"
//                   >
//                     <CheckIcon className="h-5 w-5" />
//                   </button>
//                 </>
//               )}
//               <button
//                 onClick={() => onDelete(task._id)}
//                 className="text-red-500 hover:text-red-700"
//               >
//                 <TrashIcon className="h-5 w-5" />
//               </button>
//             </div>
//           </div>
          
//           <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
//             <span className={`px-2 py-1 rounded-full text-xs ${priorityColors[task.priority]}`}>
//               {task.priority}
//             </span>
            
//             {task.dueDate && (
//               <span className="flex items-center">
//                 <ClockIcon className="h-4 w-4 mr-1" />
//                 Due: {formatDate(task.dueDate)}
//               </span>
//             )}
            
//             {task.startDate && (
//               <span className="flex items-center">
//                 <ClockIcon className="h-4 w-4 mr-1" />
//                 Start: {formatDate(task.startDate)}
//               </span>
//             )}
            
//             {task.endDate && (
//               <span className="flex items-center">
//                 <ClockIcon className="h-4 w-4 mr-1" />
//                 End: {formatDate(task.endDate)}
//               </span>
//             )}
//           </div>
//         </div>
//       )}
//     </li>
//   );
// }







import { PencilIcon, TrashIcon, CheckIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

export default function TaskItem({ task, onEdit, onDelete, onStatusChange }) {
  const formatDate = (date) => date ? new Date(date).toLocaleDateString('en-GB') : '';

  return (
    <div className="border rounded-lg p-3 mb-2 bg-white ">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className={`font-medium ${task.status === 'completed' ? 'line-through text-gray-400' : ''}`}>
            {task.title}
          </h3>
          
          <div className="flex flex-wrap gap-2 mt-1 text-sm">
            <span className={`px-2 py-1 rounded-full ${
              task.priority === 'high' ? 'bg-red-100 text-red-800' :
              task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
              'bg-blue-100 text-blue-800'
            }`}>
              {task.priority}
            </span>
            
            {task.startDate && (
              <span>Start: {formatDate(task.startDate)}</span>
            )}
            
            {task.endDate && (
              <span>End: {formatDate(task.endDate)}</span>
            )}
          </div>
          
          {task.status === 'completed' && task.remarks && (
            <p className="mt-1 text-sm text-gray-600">Notes: {task.remarks}</p>
          )}
        </div>

        <div className="flex space-x-1">
          {task.status !== 'completed' && (
            <button 
              onClick={() => onEdit(task)}
              className="p-1 text-blue-500 hover:bg-blue-50 rounded"
              title="Edit"
            >
              <PencilIcon className="h-5 w-5" />
            </button>
          )}
          
          <button
            onClick={() => onDelete(task._id)}
            className="p-1 text-red-500 hover:bg-red-50 rounded"
            title="Delete"
          >
            <TrashIcon className="h-5 w-5" />
          </button>
        </div>
      </div>

      {task.status === 'active' && (
        <button
          onClick={() => onStatusChange(task._id, 'in-progress')}
          className="mt-2 w-full flex items-center justify-center py-1 bg-gray-100 hover:bg-gray-200 rounded text-sm"
        >
          <ArrowRightIcon className="h-4 w-4 mr-1" />
          Start Progress
        </button>
      )}

      {task.status === 'in-progress' && (
        <button
          onClick={() => onStatusChange(task._id, 'completed')}
          className="mt-2 w-full flex items-center justify-center py-1 bg-green-100 hover:bg-green-200 rounded text-sm"
        >
          <CheckIcon className="h-4 w-4 mr-1" />
          Mark Complete
        </button>
      )}
    </div>
  );
}