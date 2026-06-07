import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const DatabaseNode = ({ id, data }) => {
  const [collection, setCollection] = useState(data?.collection || "");
  const [operation, setOperation] = useState(data?.operation || "Find");

  return (
    <BaseNode
      id={id}
      title="Database"
      inputs={[{ id: 'query' }]}
      outputs={[{ id: 'result' }]}
    >
      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-slate-500 dark:text-slate-400">
          Collection / Table
        </label>
        <input 
          type="text" 
          value={collection} 
          onChange={(e) => setCollection(e.target.value)} 
          placeholder="users_table"
          className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors shadow-sm"
        />
      </div>

      <div className="flex flex-col gap-1 mt-2">
        <label className="text-xs font-medium text-slate-500 dark:text-slate-400">
          Operation
        </label>
        <select 
          value={operation} 
          onChange={(e) => setOperation(e.target.value)}
          className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors shadow-sm"
        >
          <option value="Find">Find</option>
          <option value="Insert">Insert</option>
          <option value="Update">Update</option>
        </select>
      </div>
    </BaseNode>
  );
};