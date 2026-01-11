
import React, { useState, useMemo } from 'react';
import { mockProjects } from '../services/mockData';

const ProjectsList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredProjects = useMemo(() => {
    return mockProjects.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            p.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'All' || p.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, statusFilter]);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 gap-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight text-center md:text-left">Project Repository</h2>
          <p className="text-slate-500 font-medium text-center md:text-left text-sm md:text-base">Workspace initiatives</p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative w-full sm:w-auto">
            <input 
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-64 pl-10 pr-4 py-2.5 bg-white border border-slate-100 rounded-2xl text-xs font-bold focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 shadow-sm"
            />
            <svg className="w-4 h-4 absolute left-4 top-3 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          <div className="w-full sm:w-auto flex items-center gap-2 bg-white px-4 py-2 rounded-2xl border border-slate-100 shadow-sm">
            <span className="text-[10px] font-black text-slate-400 uppercase">Status:</span>
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="text-xs font-extrabold text-slate-700 border-none bg-transparent p-0 pr-8 focus:ring-0 cursor-pointer"
            >
              <option value="All">All</option>
              <option value="Active">Active</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block bg-white rounded-[40px] border border-slate-100 shadow-xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50/50 border-b border-slate-100">
            <tr>
              <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Initiative</th>
              <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Health</th>
              <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Progress</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {filteredProjects.map(project => (
              <tr key={project.id} className="hover:bg-slate-50/80 transition-all cursor-pointer">
                <td className="px-8 py-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center font-black text-sm">
                      {project.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-extrabold text-slate-900">{project.name}</p>
                      <p className="text-[10px] text-slate-400 font-bold mt-0.5">{project.description}</p>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${
                    project.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {project.status}
                  </span>
                </td>
                <td className="px-8 py-6 text-right">
                  <span className="text-xs font-black text-slate-900">{project.progress}%</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {filteredProjects.map(project => (
          <div key={project.id} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center font-black">{project.name.charAt(0)}</div>
              <div>
                <h4 className="font-black text-slate-900">{project.name}</h4>
                <span className={`text-[10px] font-black uppercase ${project.status === 'Active' ? 'text-emerald-500' : 'text-slate-400'}`}>{project.status}</span>
              </div>
            </div>
            <div className="bg-slate-50 rounded-2xl h-1.5 w-full overflow-hidden">
              <div className="bg-indigo-600 h-full" style={{ width: `${project.progress}%` }} />
            </div>
            <div className="mt-2 text-right">
              <span className="text-[10px] font-black text-slate-900">{project.progress}% Complete</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsList;
