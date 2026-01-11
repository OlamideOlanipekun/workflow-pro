
import React, { useState, useMemo } from 'react';
import { mockProjects } from '../services/mockData.ts';

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
    <div className="animate-in fade-in duration-700">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 gap-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">Project Repository</h2>
          <p className="text-slate-500 font-medium">Workspace initiatives</p>
        </div>
        
        <div className="flex gap-3">
          <input 
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-64 pl-4 pr-4 py-2.5 bg-white border border-slate-100 rounded-2xl text-xs font-bold shadow-sm"
          />
        </div>
      </div>

      <div className="bg-white rounded-[40px] border border-slate-100 shadow-xl overflow-hidden">
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
                    <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center font-black">
                      {project.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-extrabold text-slate-900">{project.name}</p>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <span className="px-2.5 py-1 rounded-lg text-[10px] font-black uppercase bg-emerald-50 text-emerald-600">
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
    </div>
  );
};

export default ProjectsList;
