function makeGreeting(name: string) {
  return `こんにちは、${name} です`;
}

const appName: string = "tasks";
console.log(makeGreeting(appName));

const title = "牛乳を買う";
const dueDate = "2026-10-12";
let done = false;
const estimateMinutes = 15;

console.log(`${title}（期限 ${dueDate}、${estimateMinutes} 分）`);
done = true;
console.log(`終わった: ${done}`);
