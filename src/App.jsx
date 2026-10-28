import { useState, useEffect, useMemo, useCallback } from "react";
import useLocalStorage from "./hooks/useLocalStorage.js";
import { useTheme } from "./context/ThemeContext.jsx";
import Header from "./components/functional/Header.jsx";
import TaskForm from "./components/functional/TaskForm.jsx";
import TaskList from "./components/functional/TaskList.jsx";
import CardWrapper from "./components/functional/CardWrapper.jsx";
import ActivityLogger from "./components/class/ActivityLogger.jsx";

export default function App() {
  const { theme } = useTheme();
  const [tasks, setTasks] = useLocalStorage("tasks", []);
  const [filter, setFilter] = useState("all");
  const [event, setEvent] = useState(null);

  const log = useCallback((message) => setEvent({ id: Date.now() + Math.random(), message }), []);

  const addTask = useCallback(({ title, priority }) => {
    setTasks((prev) => [...prev, { id: Date.now(), title, priority, done: false }]);
    log(`Added task: ${title}`);
  }, [setTasks, log]);

  const toggleTask = useCallback((id) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
    log("Toggled a task");
  }, [setTasks, log]);

  const deleteTask = useCallback((id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
    log("Deleted a task");
  }, [setTasks, log]);

  const changeFilter = (f) => { setFilter(f); log(`Filter changed to ${f}`); };

  // useMemo: filtering only recalculates when tasks/filter change
  const visible = useMemo(() => {
    if (filter === "pending") return tasks.filter((t) => !t.done);
    if (filter === "done") return tasks.filter((t) => t.done);
    if (filter === "high") return tasks.filter((t) => t.priority === "high");
    return tasks;
  }, [tasks, filter]);

  const pending = useMemo(() => tasks.filter((t) => !t.done).length, [tasks]);

  // useEffect: dynamic document title
  useEffect(() => { document.title = `(${pending}) pending tasks`; }, [pending]);

  return (
    <div className={`app ${theme}`}>
      <Header total={tasks.length} pending={pending} />
      <CardWrapper title="Add Task"><TaskForm onAdd={addTask} /></CardWrapper>
      <CardWrapper title="Tasks">
        <div className="filters">
          {["all", "pending", "done", "high"].map((f) => (
            <button key={f} className={filter === f ? "active" : ""} onClick={() => changeFilter(f)}>{f}</button>
          ))}
        </div>
        <TaskList tasks={visible} onToggle={toggleTask} onDelete={deleteTask} />
      </CardWrapper>
      <CardWrapper title="Activity Log"><ActivityLogger event={event} /></CardWrapper>
    </div>
  );
}
