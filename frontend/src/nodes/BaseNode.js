import { Handle, Position } from "reactflow";

export const BaseNode = ({
  id,
  title,
  inputs = [],
  outputs = [],
  children,
  width = 280,
  minHeight = 120,
}) => {
  return (
    <div
      className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden transition-all duration-200 hover:shadow-md hover:border-indigo-500 dark:hover:border-indigo-500 group"
      style={{ width, minHeight }}
    >
      {/* Input Handles */}
      {inputs.map((input, index) => (
        <Handle
          key={input.id}
          type="target"
          position={Position.Left}
          id={`${id}-${input.id}`}
          className="w-3 h-3 bg-slate-50 dark:bg-slate-800 border-2 border-indigo-500 rounded-full"
          style={{ top: input.top || `${((index + 1) / (inputs.length + 1)) * 100}%` }}
        />
      ))}

      {/* Node Header */}
      <div className="flex items-center px-4 py-3 bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
        <div className="w-2 h-2 rounded-full bg-indigo-500 mr-2 shadow-[0_0_8px_rgba(99,102,241,0.8)]"></div>
        <div className="font-semibold tracking-tight text-sm text-slate-800 dark:text-slate-100">
          {title}
        </div>
      </div>

      {/* Node Body (Forms & Text) */}
      <div className="p-4 flex flex-col gap-3 text-slate-700 dark:text-slate-300 text-sm">
        {children}
      </div>

      {/* Output Handles */}
      {outputs.map((output, index) => (
        <Handle
          key={output.id}
          type="source"
          position={Position.Right}
          id={`${id}-${output.id}`}
          className="w-3 h-3 bg-indigo-500 border-2 border-white dark:border-slate-900 rounded-full"
          style={{ top: output.top || `${((index + 1) / (outputs.length + 1)) * 100}%` }}
        />
      ))}
    </div>
  );
};