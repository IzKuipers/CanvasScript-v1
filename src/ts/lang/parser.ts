import { CanvasError } from "../engine/error";
import type { Keyword, Param, ParamType, ParsedParams } from "./interface";
import Background from "./keywords/bg";
import Circle from "./keywords/circle";
import Color from "./keywords/color";
import Line from "./keywords/line";
import Multiplier from "./keywords/mult";
import Rect from "./keywords/rect";
import Size from "./keywords/size";
import type { CanvasScriptLang } from "./main";

export class Parser {
  lang: CanvasScriptLang;

  keywords = {};

  constructor(engine: CanvasScriptLang) {
    if (engine) this.lang = engine;
    this.keywords = {
      size: Size(this.lang),
      bg: Background(this.lang),
      color: Color(this.lang),
      line: Line(this.lang),
      rect: Rect(this.lang),
      circle: Circle(this.lang),
      mult: Multiplier(this.lang),
    };
  }

  evaluate(line: string) {
    if (line.startsWith("@")) return this.lang.vars.parse(line);
    if (!line.length || line.startsWith("'")) return;
    if (line.includes("  "))
      throw new CanvasError(`Repeated spaces are illegal`, this.lang);

    const split = line.split(" ");
    const keyword = split[0].trim().toLowerCase();
    const keywordData = this.keywords[keyword] as Keyword;

    if (!keywordData)
      throw new CanvasError(`Invalid keyword "${keyword}"`, this.lang);

    const params = keywordData.params as Param[];

    if (split.length - 1 < params.length)
      throw new CanvasError(
        `Length of parameters is too short: ${split.length - 1} < ${
          params.length
        }`,
        this.lang
      );

    let parsed: ParsedParams = {};

    for (let i = 0; i < params.length; i++) {
      const param = params[i];
      const idx = i + 1;
      const segment = split[idx];
      const type = this.getType(segment);

      this.lang.segIdx = idx;

      if (type != param.type && param.type != "any")
        throw new CanvasError(
          `${keyword}: "${param.name}" has to be of type ${param.type}, but got ${type}.`,
          this.lang
        );

      parsed[param.name] = this.parseLiteralValue(segment);
    }

    keywordData.function(parsed);
  }

  getType(segment: string): ParamType {
    try {
      if (typeof JSON.parse(segment) == "string") return "unknown";
    } catch {}

    if (!segment) return "unknown";

    if (segment.startsWith("#") && segment.length > 1) return "hex";

    if (segment == "true" || segment == "false") return "boolean";

    try {
      const x = parseInt(segment) as any;

      return Number.isNaN(x) ? "unknown" : "number";
    } catch {
      return "unknown";
    }
  }

  parseLiteralValue(segment: string): string | number | boolean | null {
    const type = this.getType(segment);

    const values = {
      boolean: segment == "true",
      number: parseInt(segment) * (this.lang.engine.multiplier || 1),
      string: (() => {
        try {
          return JSON.parse(segment);
        } catch {}
      })(),
      hex: segment,
      unknown: null,
    };

    return values[type];
  }
}
