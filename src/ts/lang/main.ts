import { writable } from "svelte/store";
import type { CanvasScript } from "../engine/main";
import { Variables } from "../var/main";
import { Parser } from "./parser";

export const currentLine = writable<string>("");

export class CanvasScriptLang {
  engine: CanvasScript;
  parser: Parser;
  lines: string[] = [];
  lineIdx = 0;
  segIdx = 0;
  vars: Variables;

  constructor(context: string, runtime: CanvasScript) {
    this.lines = context.split("\n");
    this.engine = runtime;
    this.engine.setBackground("#000000");
    this.vars = new Variables();
    this.parser = new Parser(this);

    this.parse();
  }

  parse() {
    for (let i = 0; i < this.lines.length; i++) {
      this.lineIdx = i;
      this.segIdx = 0;

      currentLine.set(this.lines[i]);

      try {
        this.parser.evaluate(this.vars.replace(this.lines[i]));
      } catch {}
    }
  }
}
