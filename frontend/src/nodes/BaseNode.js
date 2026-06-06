import { Handle, Position } from "reactflow";

export const BaseNode = ({
  id,
  title,
  inputs = [],
  outputs = [],
  children,
  width = 260,
  minHeight = 140,
}) => {
  return (
    <div
      className="
      bg-white
      rounded-2xl
      shadow-lg
      border
      border-slate-200
      overflow-hidden
      "
      style={{
        width,
        minHeight,
      }}
    >
      {inputs.map((input, index) => (
        <Handle
          key={input.id}
          type="target"
          position={Position.Left}
          id={`${id}-${input.id}`}
          style={{
            top:
              input.top ||
              `${((index + 1) / (inputs.length + 1)) * 100}%`,
          }}
        />
      ))}

      <div
        className="
        bg-slate-800
        text-white
        px-4
        py-3
        font-semibold
        text-sm
        "
      >
        {title}
      </div>

      <div
        className="
        p-4
        flex
        flex-col
        gap-3
        "
      >
        {children}
      </div>

      {outputs.map((output, index) => (
        <Handle
          key={output.id}
          type="source"
          position={Position.Right}
          id={`${id}-${output.id}`}
          style={{
            top:
              output.top ||
              `${((index + 1) / (outputs.length + 1)) * 100}%`,
          }}
        />
      ))}
    </div>
  );
};