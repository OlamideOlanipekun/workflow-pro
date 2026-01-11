
import React, { useState, useMemo } from 'react';
import { Task, TaskStatus, TaskPriority } from '../types.ts';
import { mockTasks, mockUsers } from '../services/mockData.ts';
import TaskDetail from './TaskDetail.tsx';

const getPriorityColor = (priority: TaskPriority) => {
  switch (priority) {
    case TaskPriority.CRITICAL: return 'bg-rose-100 text-rose-700';
    case TaskPriority.HIGH: return 'bg-orange-100 text-orange-700';
    case TaskPriority.MEDIUM: return 'bg-blue-100 text-blue-700';
    case TaskPriority.LOW: return 'bg-slate-100 text-slate-700';
    default: return 'bg-slate-100 text-slate-700';
  }
};

const TaskCard: React.FC<{ task: Task; onClick: () => void }> = ({ task, onClick }) => (
  <div 
    onClick={onClick}
    className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group relative overflow-hidden"
  >
    <div className={`absolute top-0 left-0 w-1 h-full ${
      task.priority === TaskPriority.CRITICAL ? 'bg-rose-500' : 
      task.priority === TaskPriority.HIGH ? 'bg-orange-500' : 'bg-transparent'
    }`} />
    <div className="flex justify-between items-start mb-3">
      <span className={`text-[10px] font-black px-2 py-0.5 rounded-lg uppercase tracking-wider ${getPriorityColor(task.priority)}`}>
        {task.priority}
      </span>
    </div>
    <h4 className="font-extrabold text-slate-900 text-sm mb-1 leading-tight">{task.title}</h4>
    <p className="text-xs text-slate-500 font-medium line-clamp-2 mb-4 leading-relaxed">{task.description}</p>
    <div className="flex items-center justify-between pt-3 border-t border-slate-50">
      <div className="flex items-center gap-1.5 text-slate-400 font-bold">
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2-2v12a2 2 0 002 2z" />
        </svg>
        <span className="text-[10px]">{task.dueDate}</span>
      </div>
      <img 
        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${task.assignedTo}`} 
        className="w-7 h-7 rounded-lg border-2 border-white shadow-sm"
        alt="Assignee" 
      />
    </div>
  </div>
);

const KanbanBoard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [filterPriority, setFilterPriority] = useState<string>('All');
  const [filterAssignee, setFilterAssignee] = useState<string>('All');

  const columns: TaskStatus[] = [
    TaskStatus.TODO,
    TaskStatus.IN_PROGRESS,
    TaskStatus.REVIEW,
    TaskStatus.DONE
  ];

  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      const priorityMatch = filterPriority === 'All' || task.priority === filterPriority;
      const assigneeMatch = filterAssignee === 'All' || task.assignedTo === filterAssignee;
      return priorityMatch && assigneeMatch;
    });
  }, [tasks, filterPriority, filterAssignee]);

  const handleUpdateTask = (updatedTask: Task) => {
    setTasks(tasks.map(t => t.id === updatedTask.id ? updatedTask : t));
    setSelectedTask(null);
  };

  return (
    <div className="h-full">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Project Board</h2>
          <p className="text-slate-500 font-medium">Visualizing task lifecycle</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          <select 
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="text-xs font-extrabold text-slate-700 bg-white border border-slate-100 rounded-xl px-3 py-2"
          >
            <option value="All">All Priorities</option>
            {Object.values(TaskPriority).map(p => <option key={p} value={p}>{p}</option>)}
          </select>
          <select 
            value={filterAssignee}
            onChange={(e) => setFilterAssignee(e.target.value)}
            className="text-xs font-extrabold text-slate-700 bg-white border border-slate-100 rounded-xl px-3 py-2"
          >
            <option value="All">Everyone</option>
            {mockUsers.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
          </select>
          <button className="bg-indigo-600 text-white px-5 py-2.5 rounded-2xl text-xs font-black shadow-lg">New Task</button>
        </div>
      </div>

      <div className="flex gap-6 overflow-x-auto pb-8 scrollbar-hide h-[calc(100vh-280px)]">
        {columns.map((status) => (
          <div key={status} className="flex-shrink-0 w-80 flex flex-col bg-slate-50/50 rounded-[32px] p-5 border border-slate-100/50">
            <h3 className="font-black text-slate-900 text-sm tracking-tight uppercase mb-6 px-2">{status}</h3>
            <div className="flex-1 space-y-4 overflow-y-auto scrollbar-hide">
              {filteredTasks
                .filter(t => t.status === status)
                .map(task => (
                  <TaskCard key={task.id} task={task} onClick={() => setSelectedTask(task)} />
                ))}
            </div>
          </div>
        ))}
      </div>

      {selectedTask && (
        <TaskDetail 
          task={selectedTask} 
          onClose={() => setSelectedTask(null)} 
          onUpdate={handleUpdateTask} 
        />
      )}
    </div>
  );
};

export default KanbanBoard;
