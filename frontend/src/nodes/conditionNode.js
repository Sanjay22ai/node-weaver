import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const ConditionNode = ({ id, data }) => {
  const [condition, setCondition] = useState(data?.condition || "");

  return (
    <BaseNode
      id={id}
      title="Condition"
      inputs={[{ id: 'input' }]}
      // Two outputs for True/False routing
      outputs={[
        { id: 'true', top: '35%' }, 
        { id: 'false', top: '75%' }
      ]}
      width={260}
    >
      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-slate-500 dark:text-slate-400">
          Condition IF
        </label>
        <input 
          type="text" 
          value={condition} 
          onChange={(e) => setCondition(e.target.value)} 
          placeholder="data.status === 200"
          className="w-full px-3 py-2 font-mono text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors shadow-sm"
        />
      </div>
      <div className="flex flex-col mt-2 text-xs text-slate-500 dark:text-slate-400">
        <div className="flex justify-between items-center px-1">
          <span>If True</span>
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
        </div>
        <div className="flex justify-between items-center px-1 mt-1">
          <span>If False</span>
          <span className="w-2 h-2 rounded-full bg-red-500"></span>
        </div>
      </div>
    </BaseNode>
  );
};