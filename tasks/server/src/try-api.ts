const base = "http://localhost:8787/api/tasks";

async function send(
  label: string,
  method: string,
  path: string,
  body?: unknown,
): Promise<void> {
  const response = await fetch(`${base}${path}`, {
    method,
    headers: { "Content-Type": "application/json" },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  const text = await response.text();
  console.log(`${label}: ${response.status} ${text}`);
}

await send("1件を取る", "GET", "/2");
await send("無い id", "GET", "/9");
await send("追加する", "POST", "", {
  title: "洗濯する",
  status: "todo",
  priority: "low",
  estimateMinutes: 20,
});
await send("間違った状態", "POST", "", {
  title: "電気代を払う",
  status: "dnoe",
  priority: "high",
  estimateMinutes: 5,
});
await send("状態を変える", "PATCH", "/1", { status: "done" });
await send("消す", "DELETE", "/3");
await send("完了だけ", "GET", "?status=done");
