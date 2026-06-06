import { useMemo } from 'react';
import { Handle, Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import { useStore } from '../store';

export const TextNode = ({ id, data }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);
  
  const currText = data?.text || 'Hello {{input}}';

  const variables = useMemo(() => {
    const regex = /{{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*}}/g;
    const foundVariables = new Set();
    let match;

    while ((match = regex.exec(currText)) !== null) {
      foundVariables.add(match[1]);
    }
    return Array.from(foundVariables);
  }, [currText]);

  const lines = currText.split('\n');
  const longestLine = Math.max(...lines.map((line) => line.length), 20);
  const dynamicWidth = Math.min(Math.max(260, longestLine * 8), 600);
  const dynamicHeight = Math.max(140, lines.length * 28 + 100);

  return (
    <div style={{ position: 'relative' }}>
      {variables.map((variable, index) => (
        <Handle
          key={variable}
          type="target"
          position={Position.Left}
          id={`${id}-${variable}`}
          style={{ top: `${((index + 1) / (variables.length + 1)) * 100}%` }}
        />
      ))}

      <BaseNode
        id={id}
        title="Text"
        outputs={[{ id: 'output' }]}
        width={dynamicWidth}
        minHeight={dynamicHeight}
      >
        <div style={{ fontSize: '12px', color: '#64748b' }}>
          Supports variables:
        </div>

        <div style={{ fontSize: '12px', color: '#0f172a', background: '#f8fafc', padding: '8px', borderRadius: '6px' }}>
          {'{{variable}}'}
        </div>

        <textarea 
          className="w-full rounded-lg border border-slate-300 px-3 py-2 resize-none"
          value={currText}
          onChange={(e) => updateNodeField(id, 'text', e.target.value)}
          rows={4}
          placeholder="Type text here..."
          style={{
            width: '100%',
            minHeight: '80px',
            resize: 'none',
            borderRadius: '8px',
            border: '1px solid #cbd5e1',
            padding: '8px',
            fontFamily: 'inherit',
            fontSize: '14px',
          }}
        />

        {variables.length > 0 && (
          <div>
            <strong>Variables:</strong>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '6px' }}>
              {variables.map((variable) => (
                <span
                  key={variable}
                  style={{
                    background: '#e2e8f0',
                    padding: '4px 8px',
                    borderRadius: '12px',
                    fontSize: '12px',
                  }}
                >
                  {variable}
                </span>
              ))}
            </div>
          </div>
        )}
      </BaseNode>
    </div>
  );
};