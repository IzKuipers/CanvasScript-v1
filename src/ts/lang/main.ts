import type { CanvasScript } from "../engine/main";

export class CanvasScriptLang {
  lines: string[] = [];
  lineIdx = 0;
  segIdx = 0;
  constructor(context: string, runtime: CanvasScript) {
    this.lines = context.split("\n");

    this.parse();
  }

  parse() {
    for (let i = 0; i < this.lines.length; i++) {
      this.lineIdx = i;
    }
  }
}
