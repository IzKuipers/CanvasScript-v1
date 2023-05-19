import type { CanvasScriptLang } from "../lang/main";

export class CanvasError extends Error {
  constructor(message: string, context: CanvasScriptLang) {
    if (context) {
      const line = context.lineIdx + 1;
      const seg = context.segIdx + 1;

      message += ` (line ${line}, segment ${seg})`;
    }

    super(message);

    this.stack = this.stack.replace("Error:", "CanvasError:");
  }
}
