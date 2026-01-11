
import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { mockTasks } from '../services/mockData';

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Overview');
  const tabs = ['Overview', 'Team', 'Milestones', 'History'];

  const chartData = [
    { name: 'Mon', tasks: 12 }, { name: 'Tue', tasks: 19 }, { name: 'Wed', tasks: 15 },
    { name: 'Thu', tasks: 22 }, { name: 'Fri', tasks: 30 }, { name: 'Sat', tasks: 10 }, { name: 'Sun', tasks: 8 },
  ];

  return (
    <div className="space-y-6 md:space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-2xl md:text-4xl font-black text-slate-900 tracking-tight">System Overview</h2>
          <p className="text-slate-500 text-sm md:text-base font-medium mt-1">Efficiency is up 12% this week. Keep it up!</p>
        </div>
        
        {/* Horizontal Menu Bar - Enhanced */}
        <div className="bg-slate-200/50 p-1.5 rounded-2xl flex items-center gap-1 self-start shadow-inner">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-xl text-xs font-black transition-all duration-300 relative ${
                activeTab === tab 
                ? 'bg-white text-indigo-600 shadow-md ring-1 ring-slate-100' 
                : 'text-slate-500 hover:text-slate-900 hover:bg-white/40'
              }`}
            >
              {tab}
              {activeTab === tab && (
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-indigo-500 rounded-full border-2 border-white"></span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm relative overflow-hidden flex flex-col justify-center group hover:border-indigo-200 transition-all hover:shadow-lg">
          <div className="flex items-center justify-between relative z-10">
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Completion Rate</p>
              <h3 className="text-3xl font-black text-slate-900 mt-1">84.2%</h3>
            </div>
            <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 group-hover:scale-110 group-hover:bg-emerald-100 transition-all duration-300">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 relative z-10">
            <span className="text-emerald-500 font-bold text-xs">+4.1%</span>
            <span className="text-slate-400 text-xs font-bold uppercase tracking-tighter">vs last month</span>
          </div>
          <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-emerald-50/30 rounded-full blur-2xl group-hover:bg-emerald-100/50 transition-colors"></div>
        </div>

        <div className="lg:col-span-2 bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Productivity Trend</h3>
            <div className="flex items-center gap-2">
                <div className="flex -space-x-2 mr-4 hidden sm:flex">
                    {[1,2,3].map(i => (
                        <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-slate-200 shadow-sm"></div>
                    ))}
                </div>
                <select className="text-[10px] font-black bg-slate-50 border-none rounded-lg focus:ring-2 focus:ring-indigo-100 uppercase cursor-pointer py-1.5 px-3">
                <option>Last 7 Days</option>
                <option>Last 30 Days</option>
                </select>
            </div>
          </div>
          <div className="h-40 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorTasks" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" hide />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: '16px', 
                    border: 'none', 
                    boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)', 
                    fontSize: '11px', 
                    fontWeight: '800',
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(4px)'
                  }} 
                />
                <Area type="monotone" dataKey="tasks" stroke="#6366f1" strokeWidth={4} fillOpacity={1} fill="url(#colorTasks)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        <div className="bg-white p-6 md:p-8 rounded-[40px] border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-base md:text-lg font-black text-slate-900">Critical Tasks</h3>
            <button className="text-[10px] font-black text-indigo-600 uppercase tracking-widest hover:text-indigo-700 hover:bg-indigo-50 px-3 py-1.5 rounded-lg transition-all">View All</button>
          </div>
          <div className="space-y-4">
            {mockTasks.slice(0, 3).map((task) => (
              <div key={task.id} className="flex items-center gap-4 p-4 rounded-2xl border border-slate-50 hover:border-indigo-100 hover:bg-indigo-50/30 transition-all cursor-pointer group">
                <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center text-rose-600 shrink-0 font-extrabold text-xs uppercase shadow-sm group-hover:scale-105 transition-transform">
                  {task.priority.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-slate-800 text-sm truncate group-hover:text-indigo-600 transition-colors">{task.title}</h4>
                  <p className="text-[10px] text-slate-400 font-black uppercase tracking-tighter">{task.dueDate}</p>
                </div>
                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${task.assignedTo}`} className="w-8 h-8 rounded-lg border-2 border-white shadow-sm ring-1 ring-slate-100" alt="avatar" />
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 md:p-8 rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
          <h3 className="text-base md:text-lg font-black text-slate-900 mb-6">Recent Activity</h3>
          <div className="relative pl-6 space-y-8 before:content-[''] before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-100">
            {[
              { text: 'Sarah updated Task #452', time: '2H AGO', color: 'bg-indigo-500' },
              { text: 'New project "Alpha" created', time: '5H AGO', color: 'bg-emerald-500' },
              { text: 'Meeting scheduled for 3PM', time: '1D AGO', color: 'bg-amber-500' }
            ].map((activity, i) => (
              <div key={i} className="relative group/item">
                <div className={`absolute -left-[21px] top-1.5 w-3 h-3 rounded-full bg-white border-2 ${activity.color} z-10 group-hover/item:scale-125 transition-transform`}></div>
                <div className="group-hover/item:translate-x-1 transition-transform">
                  <p className="text-xs md:text-sm font-black text-slate-800 leading-tight">{activity.text}</p>
                  <p className="text-[10px] text-slate-400 mt-1 font-bold uppercase tracking-widest">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
