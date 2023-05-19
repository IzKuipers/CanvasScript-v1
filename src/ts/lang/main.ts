import type { CanvasScript } from "../engine/main";
import { Parser } from "./store";

export class CanvasScriptLang {
  engine: CanvasScript;
  parser: Parser;
  lines: string[] = [];
  lineIdx = 0;
  segIdx = 0;

  constructor(context: string, runtime: CanvasScript) {
    this.lines = context.split("\n");
    this.engine = runtime;

    this.engine.setBackground("#000000");

    this.parser = new Parser(this);

    this.parse();
  }

  parse() {
    for (let i = 0; i < this.lines.length; i++) {
      this.lineIdx = i;
      try {
        this.parser.evaluate(this.lines[i]);
      } catch (e) {
        console.error(e);
      }
    }
  }
}
