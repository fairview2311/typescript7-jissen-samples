import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App.tsx";

const root = document.getElementById("root");
if (root === null) {
  throw new Error("id が root の要素がありません");
}

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
