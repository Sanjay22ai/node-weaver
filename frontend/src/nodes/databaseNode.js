import { BaseNode } from './BaseNode';
import { useStore } from '../store';

export const DatabaseNode = ({ id, data }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);
  const table = data?.table || '';

  return (
    <BaseNode
      id={id}
      title="Database"
      inputs={[{ id: 'query' }]}
      outputs={[{ id: 'result' }]}
    >
      <label>
        Table
        <input 
          className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={table}
          onChange={(e) => updateNodeField(id, 'table', e.target.value)}
          placeholder="users"
          style={{ width: '100%' }}
        />
      </label>
    </BaseNode>
  );
};