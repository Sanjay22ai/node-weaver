import { BaseNode } from './BaseNode';
import { useStore } from '../store';

export const TransformNode = ({ id, data }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);
  const operation = data?.operation || 'uppercase';

  return (
    <BaseNode
      id={id}
      title="Transform"
      inputs={[{ id: 'input' }]}
      outputs={[{ id: 'output' }]}
    >
      <label>
        Operation
        <select 
          className="w-full rounded-lg border border-slate-300 px-3 py-2"
          value={operation}
          onChange={(e) => updateNodeField(id, 'operation', e.target.value)}
          style={{ width: '100%' }}
        >
          <option value="uppercase">Uppercase</option>
          <option value="lowercase">Lowercase</option>
          <option value="trim">Trim</option>
          <option value="json">JSON Parse</option>
        </select>
      </label>
    </BaseNode>
  );
};