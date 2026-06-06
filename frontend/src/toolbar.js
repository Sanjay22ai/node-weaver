import { DraggableNode } from "./draggableNode";

export const PipelineToolbar = () => {
  return (
    <div
      className="
      bg-white
      border-b
      border-slate-200
      px-6
      py-4
      shadow-sm
      "
    >
      <h2
        className="
        text-xl
        font-bold
        text-slate-800
        mb-4
        "
      >
        Pipeline Components
      </h2>

      <div
        className="
        flex
        flex-wrap
        gap-3
        "
      >
        <DraggableNode type="customInput" label="Input" />
        <DraggableNode type="llm" label="LLM" />
        <DraggableNode type="customOutput" label="Output" />
        <DraggableNode type="text" label="Text" />
        <DraggableNode type="api" label="API" />
        <DraggableNode type="database" label="Database" />
        <DraggableNode type="transform" label="Transform" />
        <DraggableNode type="condition" label="Condition" />
        <DraggableNode type="merge" label="Merge" />
      </div>
    </div>
  );
};