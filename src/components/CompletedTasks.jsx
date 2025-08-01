import { CheckIcon, ClockIcon } from '@heroicons/react/24/outline';

export default function CompletedTasks({ tasks }) {
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Completed Tasks</h2>
      {tasks.length === 0 ? (
        <p className="text-gray-500">No completed tasks yet</p>
      ) : (
        <ul className="space-y-3">
          {tasks.map(task => (
            <li key={task._id} className="border rounded-lg p-4 bg-gray-50">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium line-through">{task.title}</p>
                  {task.remarks && (
                    <p className="text-sm text-gray-600 mt-1">Remarks: {task.remarks}</p>
                  )}
                </div>
                <div className="flex items-center space-x-1 text-sm text-gray-500">
                  <CheckIcon className="h-4 w-4 text-green-500" />
                  <span>Completed on {formatDate(task.completedAt)}</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mt-2 text-sm">
                {task.startDate && (
                  <span className="flex items-center">
                    <ClockIcon className="h-4 w-4 mr-1" />
                    Started: {formatDate(task.startDate)}
                  </span>
                )}
                {task.endDate && (
                  <span className="flex items-center">
                    <ClockIcon className="h-4 w-4 mr-1" />
                    Ended: {formatDate(task.endDate)}
                  </span>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}