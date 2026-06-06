export const DraggableNode = ({
  type,
  label,
}) => {
  const onDragStart = (
    event,
    nodeType
  ) => {
    const appData = {
      nodeType,
    };

    event.dataTransfer.setData(
      "application/reactflow",
      JSON.stringify(appData)
    );

    event.dataTransfer.effectAllowed =
      "move";
  };

  return (
    <div
      draggable
      onDragStart={(event) =>
        onDragStart(event, type)
      }
      className="
      cursor-grab
      bg-slate-800
      hover:bg-slate-700
      text-white
      rounded-xl
      shadow-md
      px-4
      py-3
      min-w-[110px]
      text-center
      transition-all
      duration-200
      "
    >
      {label}
    </div>
  );
};