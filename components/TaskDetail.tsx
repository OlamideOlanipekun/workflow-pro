
import React, { useState } from 'react';
import { Task, TaskStatus, TaskPriority } from '../types';
import { currentUser, mockUsers } from '../services/mockData';

interface TaskDetailProps {
  task: Task;
  onClose: () => void;
  onUpdate: (updatedTask: Task) => void;
}

const TaskDetail: React.FC<TaskDetailProps> = ({ task, onClose, onUpdate }) => {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([
    { id: 'c1', user: mockUsers[1], text: 'Initial research is complete. Focus on mobile.', date: '2 hours ago' }
  ]);

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;
    setComments([{ id: Date.now().toString(), user: currentUser, text: comment, date: 'Just now' }, ...comments]);
    setComment('');
  };

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px]" onClick={onClose} />
      <div className="relative w-full sm:max-w-xl bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-500">
        <div className="p-4 md:p-8 border-b border-slate-100 flex items-center justify-between">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Task Detail</span>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-xl text-slate-400">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 md:p-10 space-y-8 scrollbar-hide">
          <input 
            className="text-2xl md:text-4xl font-black text-slate-900 w-full bg-transparent border-none focus:ring-0 p-0 tracking-tight" 
            defaultValue={task.title}
            onBlur={(e) => onUpdate({ ...task, title: e.target.value })}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-slate-50 p-4 rounded-2xl">
              <label className="text-[10px] font-black text-slate-400 uppercase mb-2 block">Status</label>
              <select 
                className="w-full bg-transparent border-none text-sm font-bold p-0 focus:ring-0"
                value={task.status}
                onChange={(e) => onUpdate({ ...task, status: e.target.value as TaskStatus })}
              >
                {Object.values(TaskStatus).map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div className="bg-slate-50 p-4 rounded-2xl">
              <label className="text-[10px] font-black text-slate-400 uppercase mb-2 block">Priority</label>
              <select 
                className="w-full bg-transparent border-none text-sm font-bold p-0 focus:ring-0"
                value={task.priority}
                onChange={(e) => onUpdate({ ...task, priority: e.target.value as TaskPriority })}
              >
                {Object.values(TaskPriority).map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
          </div>

          <section>
            <label className="text-[10px] font-black text-slate-400 uppercase mb-2 block tracking-widest">Description</label>
            <textarea 
              className="w-full bg-slate-50 border-none rounded-2xl text-sm font-medium p-4 min-h-[120px] focus:ring-2 focus:ring-indigo-100 leading-relaxed"
              defaultValue={task.description}
            />
          </section>

          <section className="space-y-4">
            <label className="text-[10px] font-black text-slate-400 uppercase block tracking-widest">Activity</label>
            {comments.map(c => (
              <div key={c.id} className="flex gap-3">
                <img src={c.user.avatar} className="w-8 h-8 rounded-lg shrink-0" />
                <div className="flex-1 bg-slate-50 p-4 rounded-2xl">
                  <p className="text-xs font-black text-slate-800 mb-1">{c.user.name}</p>
                  <p className="text-xs text-slate-600 font-medium">{c.text}</p>
                </div>
              </div>
            ))}
          </section>
        </div>

        <div className="p-4 md:p-8 border-t border-slate-100 bg-white">
          <form onSubmit={handleAddComment} className="flex gap-2">
            <input 
              type="text" 
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Reply..."
              className="flex-1 bg-slate-100 border-none rounded-xl text-xs font-bold px-4 focus:ring-2 focus:ring-indigo-500"
            />
            <button className="bg-indigo-600 text-white px-6 py-3 rounded-xl text-xs font-black">Reply</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TaskDetail;
