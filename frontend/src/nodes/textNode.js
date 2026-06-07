import { useState, useRef, useEffect } from 'react';
import { BaseNode } from './BaseNode';

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || "");
  const textareaRef = useRef(null);

  // 1. Regex to extract variables wrapped in {{ }}
  // Matches valid JavaScript variable names: letters, numbers, _, $
  const extractVariables = (text) => {
    const regex = /{{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*}}/g;
    const matches = [...text.matchAll(regex)];
    const vars = matches.map((match) => match[1]);
    return [...new Set(vars)]; // Return unique variables only
  };

  const variables = extractVariables(currText);

  // 2. Generate dynamic inputs array for BaseNode handles
  const dynamicInputs = variables.map((variable) => ({
    id: variable,
  }));

  // 3. Auto-resize height using DOM scrollHeight
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'; // Reset height
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Expand to fit content
    }
  }, [currText]);

  // 4. Auto-resize width based on the longest line of text
  const lines = currText.split('\n');
  const maxLineLength = Math.max(...lines.map(line => line.length));
  // Clamp width between 320px (min) and 600px (max)
  const dynamicWidth = Math.min(600, Math.max(320, maxLineLength * 8 + 60));

  return (
    <BaseNode
      id={id}
      title="Text"
      inputs={dynamicInputs} // Pass dynamic handles to the wrapper
      outputs={[{ id: 'output' }]}
      width={dynamicWidth}
    >
      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-slate-500 dark:text-slate-400">
          Text Content
        </label>
        <textarea
          ref={textareaRef}
          value={currText}
          onChange={(e) => setCurrText(e.target.value)}
          placeholder="Type {{variable}} to create an input..."
          rows={3}
          className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-100 shadow-sm resize-none overflow-hidden"
        />
      </div>
      
      {/* Visual Feedback: Show active variables as badges */}
      {variables.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-2">
          {variables.map((v) => (
            <span 
              key={v} 
              className="text-[10px] font-mono px-2 py-0.5 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-full border border-indigo-100 dark:border-indigo-500/20"
            >
              {v}
            </span>
          ))}
        </div>
      )}
    </BaseNode>
  );
};