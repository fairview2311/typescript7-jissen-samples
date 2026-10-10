function makeGreeting(name: string) {
  return `こんにちは、${name} です`;
}

const appName: string = "tasks";
console.log(makeGreeting(appName));

type Task = {
  id: number;
  title: string;
  dueDate?: string;
  done: boolean;
  estimateMinutes: number;
};

const tasks: Task[] = [
  {
    id: 1,
    title: "牛乳を買う",
    dueDate: "2026-10-12",
    done: false,
    estimateMinutes: 15,
  },
  {
    id: 2,
    title: "本の原稿を書く",
    dueDate: "2026-10-20",
    done: false,
    estimateMinutes: 120,
  },
  {
    id: 3,
    title: "歯医者を予約する",
    done: true,
    estimateMinutes: 10,
  },
  {
    id: 4,
    title: "部屋を片付ける",
    dueDate: "2026-10-11",
    done: false,
    estimateMinutes: 30,
  },
  {
    id: 5,
    title: "TypeScript の本を読む",
    done: false,
    estimateMinutes: 60,
  },
];

for (const task of tasks) {
  const mark = task.done ? "[x]" : "[ ]";
  const due = task.dueDate ?? "期限なし";
  console.log(`${mark} ${task.id}. ${task.title}（${due}、${task.estimateMinutes} 分）`);
}
