import { memo } from "react";

// memo prevents re-render when props are unchanged
function TaskCard({ task, onToggle, onDelete }) {
  return (
    <li className={`task ${task.done ? "done" : ""}`}>
      <input type="checkbox" checked={task.done} onChange={() => onToggle(task.id)} />
      <span className="title">{task.title}</span>
      {/* logical short-circuit for priority indicator */}
      {task.priority === "high" && <span className="badge high">🔥 High</span>}
      {task.priority !== "high" && <span className={`badge ${task.priority}`}>{task.priority}</span>}
      <button onClick={() => onDelete(task.id)}>✕</button>
    </li>
  );
}
export default memo(TaskCard);
