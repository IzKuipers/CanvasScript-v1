import { writable } from "svelte/store";
import type { CanvasScriptLang } from "../lang/main";

export const Err = writable<{ message: string; line: number; seg: number }>(
  null
);

Err.subscribe((v) => console.log(v));

export class CanvasError extends Error {
  constructor(message: string, context: CanvasScriptLang) {
    Err.set({ message, line: context.lineIdx + 1, seg: context.segIdx + 1 });

    if (context) {
      const line = context.lineIdx + 1;
      const seg = context.segIdx + 1;

      message += ` (line ${line}, segment ${seg})`;
    }

    super(message);

    this.stack = this.stack.replace("Error:", "CanvasError:");
  }
}
