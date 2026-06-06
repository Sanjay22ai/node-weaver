import { BaseNode } from './BaseNode';
import { useStore } from '../store';

export const ConditionNode = ({ id, data }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);
  const condition = data?.condition || '';

  return (
    <BaseNode
      id={id}
      title="Condition"
      inputs={[{ id: 'input' }]}
      outputs={[{ id: 'true' }, { id: 'false' }]}
    >
      <label>
        Condition
        <input 
          className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={condition}
          onChange={(e) => updateNodeField(id, 'condition', e.target.value)}
          placeholder="value > 10"
          style={{ width: '100%' }}
        />
      </label>
    </BaseNode>
  );
};