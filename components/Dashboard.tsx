
import React, { useState } from 'react';
import { mockTasks } from '../services/mockData.ts';

const SimpleSparkline = () => (
  <svg viewBox="0 0 400 100" className="w-full h-full text-indigo-500">
    <path
      d="M0,80 Q50,20 100,50 T200,30 T300,70 T400,40"
      fill="none"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
    />
    <path
      d="M0,80 Q50,20 100,50 T200,30 T300,70 T400,40 V100 H0 Z"
      fill="url(#gradient)"
      className="opacity-10"
    />
    <defs>
      <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="currentColor" />
        <stop offset="100%" stopColor="white" />
      </linearGradient>
    </defs>
  </svg>
);

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Overview');
  const tabs = ['Overview', 'Team', 'Milestones', 'History'];

  return (
    <div className="space-y-6 md:space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-2xl md:text-4xl font-black text-slate-900 tracking-tight">System Overview</h2>
          <p className="text-slate-500 text-sm md:text-base font-medium mt-1">Efficiency is up 12% this week.</p>
        </div>
        
        <div className="bg-slate-200/50 p-1.5 rounded-2xl flex items-center gap-1">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-xl text-xs font-black transition-all ${
                activeTab === tab 
                ? 'bg-white text-indigo-600 shadow-md' 
                : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Completion Rate</p>
          <h3 className="text-3xl font-black text-slate-900 mt-1">84.2%</h3>
          <div className="mt-4 flex items-center gap-2">
            <span className="text-emerald-500 font-bold text-xs">+4.1%</span>
            <span className="text-slate-400 text-xs font-bold uppercase">vs last month</span>
          </div>
        </div>

        <div className="lg:col-span-2 bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Productivity Trend</h3>
            <span className="text-xs font-bold text-indigo-600">Last 7 Days</span>
          </div>
          <div className="h-32 w-full">
            <SimpleSparkline />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        <div className="bg-white p-6 md:p-8 rounded-[40px] border border-slate-100 shadow-sm">
          <h3 className="text-base md:text-lg font-black text-slate-900 mb-6">Critical Tasks</h3>
          <div className="space-y-4">
            {mockTasks.slice(0, 3).map((task) => (
              <div key={task.id} className="flex items-center gap-4 p-4 rounded-2xl border border-slate-50 hover:border-indigo-100 hover:bg-indigo-50/30 transition-all cursor-pointer group">
                <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center text-rose-600 font-extrabold text-xs shadow-sm">
                  {task.priority.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-slate-800 text-sm truncate group-hover:text-indigo-600 transition-colors">{task.title}</h4>
                  <p className="text-[10px] text-slate-400 font-black uppercase tracking-tighter">{task.dueDate}</p>
                </div>
                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${task.assignedTo}`} className="w-8 h-8 rounded-lg" alt="avatar" />
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 md:p-8 rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
          <h3 className="text-base md:text-lg font-black text-slate-900 mb-6">Recent Activity</h3>
          <div className="relative pl-6 space-y-6 before:content-[''] before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-100">
            {[
              { text: 'Sarah updated Task #452', time: '2H AGO', color: 'bg-indigo-500' },
              { text: 'New project "Alpha" created', time: '5H AGO', color: 'bg-emerald-500' },
              { text: 'Meeting scheduled for 3PM', time: '1D AGO', color: 'bg-amber-500' }
            ].map((activity, i) => (
              <div key={i} className="relative">
                <div className={`absolute -left-[21px] top-1.5 w-3 h-3 rounded-full bg-white border-2 ${activity.color}`}></div>
                <p className="text-xs md:text-sm font-black text-slate-800">{activity.text}</p>
                <p className="text-[10px] text-slate-400 mt-1 font-bold uppercase tracking-widest">{activity.time}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
