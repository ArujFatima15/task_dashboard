import { useState, useRef, useEffect } from "react";

export default function TaskForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("medium");
  const inputRef = useRef(null);

  // useRef: focus input on mount
  useEffect(() => { inputRef.current.focus(); }, []);

  const handleSubmit = (e) => {
    e.preventDefault(); // synthetic event
    if (!title.trim()) return;
    onAdd({ title: title.trim(), priority });
    setTitle("");
    inputRef.current.focus(); // focus again after submit
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <input
        ref={inputRef}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="New task..."
      />
      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <button type="submit">Add</button>
    </form>
  );
}
