import { BaseNode } from './BaseNode';

export const LLMNode = ({ id }) => {
  return (
    <BaseNode
      id={id}
      title="LLM"
      inputs={[
        {
          id: 'system',
        },
        {
          id: 'prompt',
        },
      ]}
      outputs={[
        {
          id: 'response',
        },
      ]}
    >
      <div>
        <strong>Model:</strong> GPT
      </div>

      <div
        style={{
          color: '#64748b',
          fontSize: '13px',
        }}
      >
        Accepts a system prompt and user prompt,
        returns a generated response.
      </div>
    </BaseNode>
  );
};