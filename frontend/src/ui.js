// ui.js

import { useState, useRef, useCallback } from 'react';
import ReactFlow, {
  Controls,
  Background,
  MiniMap,
} from 'reactflow';

import { shallow } from 'zustand/shallow';
import { useStore } from './store';

import { InputNode } from './nodes/inputNode';
import { OutputNode } from './nodes/outputNode';
import { LLMNode } from './nodes/llmNode';
import { TextNode } from './nodes/textNode';

import { APINode } from './nodes/apiNode';
import { DatabaseNode } from './nodes/databaseNode';
import { TransformNode } from './nodes/transformNode';
import { ConditionNode } from './nodes/conditionNode';
import { MergeNode } from './nodes/mergeNode';

import 'reactflow/dist/style.css';

const gridSize = 20;

const proOptions = {
  hideAttribution: true,
};

const nodeTypes = {
  customInput: InputNode,
  customOutput: OutputNode,
  llm: LLMNode,
  text: TextNode,

  api: APINode,
  database: DatabaseNode,
  transform: TransformNode,
  condition: ConditionNode,
  merge: MergeNode,
};

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

export const PipelineUI = () => {
  const reactFlowWrapper = useRef(null);

  const [reactFlowInstance, setReactFlowInstance] =
    useState(null);

  const {
    nodes,
    edges,
    getNodeID,
    addNode,
    onNodesChange,
    onEdgesChange,
    onConnect,
  } = useStore(selector, shallow);

  const getInitNodeData = (
    nodeID,
    type
  ) => ({
    id: nodeID,
    nodeType: type,
  });

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds =
        reactFlowWrapper.current.getBoundingClientRect();

      const transferData =
        event.dataTransfer.getData(
          'application/reactflow'
        );

      if (!transferData) {
        return;
      }

      const appData =
        JSON.parse(transferData);

      const type =
        appData?.nodeType;

      if (!type) {
        return;
      }

      const position =
        reactFlowInstance.project({
          x:
            event.clientX -
            reactFlowBounds.left,
          y:
            event.clientY -
            reactFlowBounds.top,
        });

      const nodeID =
        getNodeID(type);

      const newNode = {
        id: nodeID,
        type,
        position,
        data: getInitNodeData(
          nodeID,
          type
        ),
      };

      addNode(newNode);
    },
    [
      reactFlowInstance,
      addNode,
      getNodeID,
    ]
  );

  const onDragOver =
    useCallback((event) => {
      event.preventDefault();
      event.dataTransfer.dropEffect =
        'move';
    }, []);

  return (
    // FIX 1: Changed w-screen h-[75vh] to w-full h-full
    <div ref={reactFlowWrapper} className="w-full h-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onInit={setReactFlowInstance}
        nodeTypes={nodeTypes}
        proOptions={proOptions}
        snapGrid={[gridSize, gridSize]}
        connectionLineType="smoothstep"
        fitView
      >
        <Background color="#94a3b8" gap={20} size={1} />
        
        {/* FIX 2: Added Dark Mode styling to the MiniMap */}
        <MiniMap 
          zoomable 
          pannable 
          className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-md"
          maskColor="rgba(15, 23, 42, 0.2)"
          nodeColor="#4f46e5"
        />

        <Controls className="bg-white dark:bg-slate-800 border-none shadow-md" />
      </ReactFlow>
    </div>
  );
}