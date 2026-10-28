import TaskCard from "./TaskCard.jsx";

export default function TaskList({ tasks, onToggle, onDelete }) {
  // ternary for empty state; map with unique keys
  return tasks.length === 0 ? (
    <p className="empty">No tasks to show 🎉</p>
  ) : (
    <ul className="list">
      {tasks.map((t) => (
        <TaskCard key={t.id} task={t} onToggle={onToggle} onDelete={onDelete} />
      ))}
    </ul>
  );
}
