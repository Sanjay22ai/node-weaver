import React from 'react';

export const LandingPage = ({ onEnter }) => {
  return (
    <div className="relative flex items-center justify-center min-h-screen bg-slate-50 dark:bg-slate-950 overflow-hidden transition-colors duration-300">
      {/* Background abstract shapes */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-violet-500/20 rounded-full blur-3xl"></div>

      {/* Glassmorphism Card */}
      <div className="relative z-10 w-full max-w-md p-8 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 dark:border-slate-800 text-center">
        <div className="w-16 h-16 mx-auto mb-6 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/30">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white mb-2">
          DAG Forge
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-8">
          Architect your AI pipelines with precision.
        </p>

        <div className="space-y-4">
          <input 
            type="text" 
            placeholder="Workspace Name" 
            className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white transition-all"
            defaultValue="Production Pipeline"
          />
          <button 
            onClick={onEnter}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
          >
            Enter Workspace
          </button>
        </div>
      </div>
    </div>
  );
};