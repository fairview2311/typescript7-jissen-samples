import { useEffect, useState } from "react";
import { changeStatus, createTask, fetchTasks, removeTask, type NewTask } from "./api.ts";
import { TaskForm } from "./TaskForm.tsx";
import { TaskItem } from "./TaskItem.tsx";
import type { Task } from "./types.ts";

export function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [error, setError] = useState<string | null>(null);

  const reload = async () => {
    try {
      setTasks(await fetchTasks());
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    }
  };

  useEffect(() => {
    void reload();
  }, []);

  const handleAdd = async (task: NewTask) => {
    await createTask(task);
    await reload();
  };

  const handleToggle = async (task: Task) => {
    await changeStatus(task.id, task.status === "done" ? "todo" : "done");
    await reload();
  };

  const handleDelete = async (id: number) => {
    await removeTask(id);
    await reload();
  };

  return (
    <main>
      <h1>tasks</h1>
      <TaskForm onAdd={handleAdd} />
      {error !== null && <p role="alert">{error}</p>}
      <ul>
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} onToggle={handleToggle} onDelete={handleDelete} />
        ))}
      </ul>
    </main>
  );
}
