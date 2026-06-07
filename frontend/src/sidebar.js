import { DraggableNode } from "./draggableNode";
import { 
  ArrowRightToLine, // For Input
  Cpu,              // For LLM
  ArrowRightFromLine, // For Output
  Text,             // For Text
  Globe,            // For API
  Database,         // For Database
  Zap,              // For Transform
  GitBranch,        // For Condition
  Link              // For Merge
} from "lucide-react";

export const PipelineSidebar = () => {
  return (
    <div className="w-72 h-full bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 shadow-sm flex flex-col transition-colors duration-300 z-10">
      
      {/* Sidebar Header */}
      <div className="px-6 py-6 border-b border-slate-100 dark:border-slate-800">
        <h2 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
          <div className="w-3 h-3 bg-indigo-600 rounded-sm"></div>
          Components
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Drag and drop to build</p>
      </div>

      {/* Node List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        <DraggableNode type="customInput" label="Input" icon={<ArrowRightToLine size={18} strokeWidth={2} />} />
        <DraggableNode type="llm" label="LLM" icon={<Cpu size={18} strokeWidth={2} />} />
        <DraggableNode type="customOutput" label="Output" icon={<ArrowRightFromLine size={18} strokeWidth={2} />} />
        <DraggableNode type="text" label="Text" icon={<Text size={18} strokeWidth={2} />} />
        <DraggableNode type="api" label="API" icon={<Globe size={18} strokeWidth={2} />} />
        <DraggableNode type="database" label="Database" icon={<Database size={18} strokeWidth={2} />} />
        <DraggableNode type="transform" label="Transform" icon={<Zap size={18} strokeWidth={2} />} />
        <DraggableNode type="condition" label="Condition" icon={<GitBranch size={18} strokeWidth={2} />} />
        <DraggableNode type="merge" label="Merge" icon={<Link size={18} strokeWidth={2} />} />
      </div>
    </div>
  );
};