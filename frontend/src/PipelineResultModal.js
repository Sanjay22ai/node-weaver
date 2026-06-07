export const PipelineResultModal = ({ open, onClose, result }) => {
  if (!open || !result) return null;

  const isSuccess = result.is_dag;

  return (
    <div className="fixed inset-0 bg-slate-900/40 dark:bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity">
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-8 min-w-[380px] transform transition-all">
        
        <div className="flex items-center gap-3 mb-6">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isSuccess ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400' : 'bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-400'}`}>
            {isSuccess ? '✓' : '✗'}
          </div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
            Analysis Complete
          </h2>
        </div>

        <div className="space-y-4 mb-8">
          <div className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
            <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Nodes</span>
            <span className="text-lg font-bold text-slate-900 dark:text-white">{result.num_nodes}</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
            <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Edges</span>
            <span className="text-lg font-bold text-slate-900 dark:text-white">{result.num_edges}</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
            <span className="text-sm font-medium text-slate-500 dark:text-slate-400">DAG Status</span>
            <span className={`text-sm font-bold px-2 py-1 rounded-md ${isSuccess ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400' : 'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400'}`}>
              {isSuccess ? "Valid" : "Cycle Detected"}
            </span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full bg-slate-900 hover:bg-slate-800 dark:bg-indigo-600 dark:hover:bg-indigo-700 text-white font-semibold px-4 py-3 rounded-xl transition-colors"
        >
          Dismiss
        </button>
      </div>
    </div>
  );
};