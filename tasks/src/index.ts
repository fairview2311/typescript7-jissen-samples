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

function formatTask(task: Task): string {
  const mark = task.done ? "[x]" : "[ ]";
  const due = task.dueDate ?? "期限なし";
  return `${mark} ${task.id}. ${task.title}（${due}、${task.estimateMinutes} 分）`;
}

function printTasks(label: string, list: Task[]): void {
  console.log(`--- ${label} ---`);
  for (const task of list) {
    console.log(formatTask(task));
  }
}

const filterUndone = (list: Task[]): Task[] => {
  return list.filter((task) => !task.done);
};

const dueKey = (task: Task): string => task.dueDate ?? "9999-12-31";

const sortByDueDate = (list: Task[]): Task[] => {
  return [...list].sort((a, b) => dueKey(a).localeCompare(dueKey(b)));
};

const undone = filterUndone(tasks);
printTasks("未完了", undone);
printTasks("未完了を期限の近い順に", sortByDueDate(undone));

const titles = sortByDueDate(undone).map((task) => task.title);
console.log(`次にやること: ${titles[0]}`);
