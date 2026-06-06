import { BaseNode } from './BaseNode';
import { useStore } from '../store';

export const OutputNode = ({ id, data }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);
  
  const currName = data?.outputName || id.replace('customOutput-', 'output_');
  const outputType = data?.outputType || 'Text';

  return (
    <BaseNode
      id={id}
      title="Output"
      inputs={[{ id: 'value' }]}
    >
      <label>
        Name
        <input 
          className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={currName}
          onChange={(e) => updateNodeField(id, 'outputName', e.target.value)}
          style={{ width: '100%' }}
        />
      </label>

      <label>
        Type
        <select 
          className="w-full rounded-lg border border-slate-300 px-3 py-2"
          value={outputType}
          onChange={(e) => updateNodeField(id, 'outputType', e.target.value)}
          style={{ width: '100%' }}
        >
          <option value="Text">Text</option>
          <option value="Image">Image</option>
        </select>
      </label>
    </BaseNode>
  );
};