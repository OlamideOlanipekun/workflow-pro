
import React, { useState } from 'react';
import Sidebar from './components/Sidebar.tsx';
import Dashboard from './components/Dashboard.tsx';
import KanbanBoard from './components/KanbanBoard.tsx';
import ProjectsList from './components/ProjectsList.tsx';
import LandingPage from './components/LandingPage.tsx';
import { currentUser } from './services/mockData.ts';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentView, setView] = useState('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (!isLoggedIn) {
    return <LandingPage onGetStarted={() => setIsLoggedIn(true)} />;
  }

  const renderView = () => {
    switch (currentView) {
      case 'dashboard': return <Dashboard />;
      case 'projects': return <ProjectsList />;
      case 'tasks': return <KanbanBoard />;
      case 'analytics': return (
        <div className="flex items-center justify-center min-h-[60vh] px-4">
          <div className="p-8 md:p-16 text-center bg-white rounded-[40px] border border-slate-100 shadow-2xl max-w-lg">
            <div className="w-20 h-20 md:w-24 md:h-24 bg-amber-50 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-inner">
              <svg className="w-10 h-10 md:w-12 md:h-12 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h2 className="text-xl md:text-2xl font-black text-slate-900 mb-4 tracking-tight">Performance Deep Dive</h2>
            <p className="text-slate-500 text-sm md:text-base font-medium mb-10 leading-relaxed">Our AI-driven analytics engine is crunching the latest data.</p>
            <button onClick={() => setView('dashboard')} className="w-full sm:w-auto px-8 py-3 bg-slate-900 text-white rounded-2xl font-black hover:bg-slate-800 transition-all shadow-xl">Return to Core</button>
          </div>
        </div>
      );
      default: return <Dashboard />;
    }
  };

  const handleSetView = (view: string) => {
    setView(view);
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#fcfdfe] flex flex-col md:flex-row overflow-hidden">
      <div className="hidden md:block">
        <Sidebar currentView={currentView} setView={handleSetView} />
      </div>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[60] md:hidden">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-64 bg-white shadow-2xl">
            <Sidebar currentView={currentView} setView={handleSetView} />
          </div>
        </div>
      )}
      
      <main className="flex-1 md:ml-64 overflow-y-auto h-screen scrollbar-hide">
        <div className="sticky top-0 z-30">
          <header className="glass border-b border-slate-200/50 p-4 md:p-6 px-4 md:px-10 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button onClick={() => setMobileMenuOpen(true)} className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-xl">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" /></svg>
              </button>
              <div className="relative w-40 sm:w-80 group">
                <input type="text" className="block w-full pl-10 pr-4 py-2 border border-slate-100 rounded-2xl bg-slate-50 focus:bg-white text-xs md:text-sm" placeholder="Search workspace..." />
                <svg className="h-4 w-4 absolute left-3 top-2.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </div>
            </div>
            <div className="flex items-center gap-4 cursor-pointer">
              <img src={currentUser.avatar} className="w-10 h-10 rounded-xl border-2 border-white shadow-md" alt="Profile" />
            </div>
          </header>
          <div className="px-4 md:px-12 py-3 bg-white/70 backdrop-blur-md border-b border-slate-100 overflow-x-auto scrollbar-hide">
              <div className="flex items-center gap-6 whitespace-nowrap">
                  {['General', 'Files', 'Team', 'Settings', 'API'].map((item) => (
                      <button key={item} className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-indigo-600">
                          {item}
                      </button>
                  ))}
              </div>
          </div>
        </div>
        <div className="p-4 md:p-10 md:px-12 max-w-[1600px] mx-auto pb-24">
          {renderView()}
        </div>
      </main>
    </div>
  );
};

export default App;
