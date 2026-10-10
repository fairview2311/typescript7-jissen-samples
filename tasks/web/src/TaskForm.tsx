import { useState, type SubmitEvent } from "react";
import type { NewTask } from "./api.ts";

type Props = {
  onAdd: (task: NewTask) => void;
};

export function TaskForm({ onAdd }: Props) {
  const [title, setTitle] = useState("");
  const [minutes, setMinutes] = useState(15);

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (title.trim() === "") {
      return;
    }
    onAdd({ title, priority: "medium", estimateMinutes: minutes });
    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="やること"
      />
      <input
        type="number"
        value={minutes}
        onChange={(event) => setMinutes(Number(event.target.value))}
      />
      分
      <button type="submit">足す</button>
    </form>
  );
}
