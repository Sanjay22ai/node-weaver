import { BaseNode } from './BaseNode';
import { useStore } from '../store';

export const APINode = ({ id, data }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);
  
  const url = data?.url || '';
  const method = data?.method || 'GET';

  return (
    <BaseNode
      id={id}
      title="API"
      inputs={[{ id: 'request' }]}
      outputs={[{ id: 'response' }]}
    >
      <label>
        URL
        <input 
          className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={url}
          onChange={(e) => updateNodeField(id, 'url', e.target.value)}
          placeholder="https://api.example.com"
          style={{ width: '100%' }}
        />
      </label>

      <label>
        Method
        <select 
          className="w-full rounded-lg border border-slate-300 px-3 py-2"
          value={method}
          onChange={(e) => updateNodeField(id, 'method', e.target.value)}
          style={{ width: '100%' }}
        >
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="PUT">PUT</option>
          <option value="DELETE">DELETE</option>
        </select>
      </label>
    </BaseNode>
  );
};