import { BaseNode } from './BaseNode';

export const MergeNode = ({ id }) => {
  return (
    <BaseNode
      id={id}
      title="Merge"
      inputs={[
        { id: 'inputA' },
        { id: 'inputB' }
      ]}
      outputs={[
        { id: 'merged' }
      ]}
    >
      <div
        style={{
          textAlign: 'center',
          color: '#64748b',
          fontSize: '13px'
        }}
      >
        Combines multiple inputs
      </div>
    </BaseNode>
  );
};