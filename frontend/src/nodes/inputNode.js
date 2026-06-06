import { BaseNode } from './BaseNode';
import { useStore } from '../store';

export const InputNode = ({ id, data }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);
  
  const currName = data?.inputName || id.replace('customInput-', 'input_');
  const inputType = data?.inputType || 'Text';

  return (
    <BaseNode
      id={id}
      title="Input"
      outputs={[{ id: 'value' }]}
    >
      <label>
        Name
        <input
          className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={currName}
          onChange={(e) => updateNodeField(id, 'inputName', e.target.value)}
          style={{ width: '100%' }}
        />
      </label>

      <label>
        Type
        <select
          className="w-full rounded-lg border border-slate-300 px-3 py-2"
          value={inputType}
          onChange={(e) => updateNodeField(id, 'inputType', e.target.value)}
          style={{ width: '100%' }}
        >
          <option value="Text">Text</option>
          <option value="File">File</option>
        </select>
      </label>
    </BaseNode>
  );
};