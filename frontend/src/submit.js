import { useState } from 'react';
import { useStore } from './store';
import { PipelineResultModal } from './PipelineResultModal';

// Dynamically load the URL from your .env file, fallback to localhost for local dev
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

export const SubmitButton = () => {
  const nodes = useStore((state) => state.nodes);
  const edges = useStore((state) => state.edges);

  const [result, setResult] = useState(null);
  const [open, setOpen] = useState(false);

  const handleSubmit = async () => {
    try {
      // Pass the dynamic URL to the fetch request
      const response = await fetch(`${API_BASE_URL}/pipelines/parse`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nodes,
          edges,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to analyze pipeline');
      }

      const data = await response.json();

      setResult(data);
      setOpen(true);
    } catch (error) {
      console.error(error);
      alert('Unable to connect to backend.');
    }
  };

  return (
    <>
      <div className="flex justify-center py-6">
        <button
          onClick={handleSubmit}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-xl shadow-lg transition-all duration-200"
        >
          Analyze Pipeline
        </button>
      </div>

      <PipelineResultModal
        open={open}
        result={result}
        onClose={() => setOpen(false)}
      />
    </>
  );
};