import { BaseNode } from './BaseNode';

export const MergeNode = ({ id }) => {
  return (
    <BaseNode
      id={id}
      title="Merge"
      // Multiple inputs converging
      inputs={[
        { id: 'input1', top: '35%' },
        { id: 'input2', top: '75%' }
      ]}
      outputs={[{ id: 'merged' }]}
      width={240}
    >
      <div className="flex flex-col gap-2">
        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed text-center py-2">
          Combines multiple incoming data streams into a single array payload.
        </p>
      </div>
    </BaseNode>
  );
};