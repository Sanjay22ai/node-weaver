import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const TextNode = ({ id, data }) => {
  // Initialize empty so the placeholder shows
  const [currText, setCurrText] = useState(data?.text || "");

  return (
    <BaseNode
      id={id}
      title="Text"
      inputs={[{ id: 'input' }]}
      outputs={[{ id: 'output' }]}
      width={320}
    >
      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-slate-500 dark:text-slate-400">
          Text Content
        </label>
        <textarea 
          value={currText} 
          onChange={(e) => setCurrText(e.target.value)} 
          placeholder="Enter your prompt or text here..."
          rows={3}
          className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors shadow-sm resize-none"
        />
      </div>
    </BaseNode>
  );
};