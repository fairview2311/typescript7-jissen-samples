import type { Task } from "./types.ts";

type Props = {
  task: Task;
  onToggle: (task: Task) => void;
  onDelete: (id: number) => void;
};

export function TaskItem({ task, onToggle, onDelete }: Props) {
  const done = task.status === "done";
  return (
    <li>
      <label>
        <input type="checkbox" checked={done} onChange={() => onToggle(task)} />
        {done ? <s>{task.title}</s> : task.title}
      </label>
      <span>（{task.dueDate ?? "期限なし"}、{task.estimateMinutes} 分）</span>
      <button type="button" onClick={() => onDelete(task.id)}>
        消す
      </button>
    </li>
  );
}
