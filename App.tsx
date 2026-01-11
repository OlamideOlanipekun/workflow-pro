
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import KanbanBoard from './components/KanbanBoard';
import ProjectsList from './components/ProjectsList';
import LandingPage from './components/LandingPage';
import { currentUser } from './services/mockData';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentView, setView] = useState('dashboard');
  const [notificationsOpen, setNotificationsOpen] = useState(false);
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
            <p className="text-slate-500 text-sm md:text-base font-medium mb-10 leading-relaxed">Our AI-driven analytics engine is crunching the latest data. Check back soon.</p>
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
      {/* Sidebar - Desktop */}
      <div className="hidden md:block">
        <Sidebar currentView={currentView} setView={handleSetView} />
      </div>

      {/* Sidebar - Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[60] md:hidden">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-64 bg-white animate-in slide-in-from-left duration-300 shadow-2xl">
            <Sidebar currentView={currentView} setView={handleSetView} />
          </div>
        </div>
      )}
      
      <main className="flex-1 md:ml-64 overflow-y-auto h-screen scrollbar-hide">
        <div className="sticky top-0 z-30">
          <header className="glass border-b border-slate-200/50 p-4 md:p-6 px-4 md:px-10 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setMobileMenuOpen(true)}
                className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" /></svg>
              </button>
              <div className="relative w-40 sm:w-80 group">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400 group-focus-within:text-indigo-500 transition-colors">
                  <svg className="h-4 w-4 md:h-5 md:w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </span>
                <input
                  type="text"
                  className="block w-full pl-10 md:pl-12 pr-4 py-2 md:py-3 border border-slate-100 rounded-2xl leading-5 bg-slate-50 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 focus:bg-white text-xs md:text-sm transition-all shadow-inner"
                  placeholder="Search workspace..."
                />
              </div>
            </div>

            <div className="flex items-center gap-3 md:gap-8">
              <button 
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="relative w-10 h-10 md:w-12 md:h-12 flex items-center justify-center text-slate-400 hover:text-indigo-600 transition-all bg-white rounded-2xl border border-slate-100 shadow-sm"
              >
                <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
              </button>
              
              <div className="flex items-center gap-2 md:gap-4 group cursor-pointer pl-3 md:pl-4 border-l border-slate-200">
                <div className="text-right hidden lg:block">
                  <p className="text-xs md:text-sm font-black text-slate-900 group-hover:text-indigo-600 transition-colors">{currentUser.name}</p>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">{currentUser.role}</p>
                </div>
                <img 
                  src={currentUser.avatar} 
                  className="w-10 h-10 md:w-12 md:h-12 rounded-xl border-2 border-white shadow-md transition-transform group-hover:scale-105"
                  alt="Profile"
                />
              </div>
            </div>
          </header>

          {/* Secondary Top Menu Bar */}
          <div className="px-4 md:px-12 py-3 bg-white/70 backdrop-blur-md border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-6 overflow-x-auto scrollbar-hide">
                  {['General', 'Files', 'Team', 'Settings', 'API', 'Automations'].map((item) => (
                      <button key={item} className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-indigo-600 transition-colors whitespace-nowrap relative group">
                          {item}
                          <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-indigo-500 transition-all group-hover:w-full"></span>
                      </button>
                  ))}
              </div>
              <div className="flex items-center gap-2 ml-4">
                  <button className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-slate-900 text-white rounded-lg text-[10px] font-black uppercase tracking-wider hover:bg-slate-800 transition-colors shadow-lg shadow-slate-200">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" /></svg>
                      Quick Create
                  </button>
                  <div className="hidden sm:block w-[1px] h-4 bg-slate-200 mx-2"></div>
                  <button className="flex items-center gap-2 px-3 py-1.5 bg-indigo-50 text-indigo-600 rounded-lg text-[10px] font-black uppercase tracking-wider hover:bg-indigo-100 transition-colors">
                      Invite
                  </button>
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
