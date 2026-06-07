import { useState } from 'react';
import { PipelineSidebar } from './sidebar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';
import { LandingPage } from './LandingPage';

function App() {
  const [isEntered, setIsEntered] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  if (!isEntered) {
    return <LandingPage onEnter={() => setIsEntered(true)} />;
  }

  return (
    <div className={`${isDarkMode ? 'dark' : ''}`}>
      <div className="flex h-screen w-screen overflow-hidden bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
        
        {/* Left Sidebar */}
        <PipelineSidebar />

        {/* Main Canvas Area */}
        <div className="flex-1 relative h-full">
          <PipelineUI isDarkMode={isDarkMode} />
          
          {/* Floating Action Pill (Top Right) */}
          <div className="absolute top-6 right-6 z-10 flex items-center gap-3 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-2 pl-4 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)} 
              className="text-xl p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Toggle Theme"
            >
              {isDarkMode ? '🌙' : '☀️'}
            </button>
            <div className="w-px h-6 bg-slate-200 dark:bg-slate-700"></div>
            <SubmitButton />
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;