import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const TransformNode = ({ id, data }) => {
  const [script, setScript] = useState(data?.script || "");

  return (
    <BaseNode
      id={id}
      title="Data Transform"
      inputs={[{ id: 'input' }]}
      outputs={[{ id: 'output' }]}
      width={320}
    >
      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-slate-500 dark:text-slate-400">
          Transformation Script
        </label>
        <textarea 
          value={script} 
          onChange={(e) => setScript(e.target.value)} 
          placeholder="return input.map(x => x.value);"
          rows={3}
          className="w-full px-3 py-2 font-mono text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors shadow-sm resize-none"
        />
      </div>
    </BaseNode>
  );
};