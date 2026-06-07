import { BaseNode } from './BaseNode';

export const LLMNode = ({ id }) => {
  return (
    <BaseNode
      id={id}
      title="LLM"
      inputs={[
        { id: 'system', top: '30%' },
        { id: 'prompt', top: '70%' }
      ]}
      outputs={[{ id: 'response' }]}
    >
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Model:</span>
          <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10 px-2 py-1 rounded-md">GPT-4</span>
        </div>
        
        {/* Ensures the descriptive text is legible in dark mode */}
        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
          Accepts a system prompt and user prompt, returns a generated response.
        </p>
      </div>
    </BaseNode>
  );
};