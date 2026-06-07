import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const InputNode = ({ id, data }) => {
  // 1. Initialize with an empty string so the placeholder is visible by default
  const [currName, setCurrName] = useState(data?.inputName || "");
  const [inputType, setInputType] = useState(data?.inputType || "Text");

  return (
    <BaseNode
      id={id}
      title="Input"
      outputs={[{ id: 'value' }]}
    >
      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-slate-500 dark:text-slate-400">
          Name
        </label>
        <input 
          type="text" 
          value={currName} 
          onChange={(e) => setCurrName(e.target.value)} 
          // 2. Move the hint text here
          placeholder={`input_${id.split('-')[1] || '1'}`}
          // 3. Apply the strict dark mode UI classes
          className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors shadow-sm"
        />
      </div>

      <div className="flex flex-col gap-1 mt-2">
        <label className="text-xs font-medium text-slate-500 dark:text-slate-400">
          Type
        </label>
        <select 
          value={inputType} 
          onChange={(e) => setInputType(e.target.value)}
          className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors shadow-sm"
        >
          <option value="Text">Text</option>
          <option value="File">File</option>
        </select>
      </div>
    </BaseNode>
  );
};