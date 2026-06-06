export const PipelineResultModal = ({
  open,
  onClose,
  result,
}) => {
  if (!open) return null;

  return (
    <div
      className="
      fixed
      inset-0
      bg-black/40
      flex
      items-center
      justify-center
      z-50
      "
    >
      <div
        className="
        bg-white
        rounded-2xl
        shadow-xl
        p-6
        min-w-[350px]
        "
      >
        <h2 className="text-xl font-bold mb-4">
          Pipeline Analysis
        </h2>

        <div className="space-y-2">
          <p>
            Nodes: {result.num_nodes}
          </p>

          <p>
            Edges: {result.num_edges}
          </p>

          <p>
            DAG:
            {result.is_dag
              ? " Yes"
              : " No"}
          </p>
        </div>

        <button
          onClick={onClose}
          className="
          mt-4
          bg-blue-600
          text-white
          px-4
          py-2
          rounded-lg
          "
        >
          Close
        </button>
      </div>
    </div>
  );
};