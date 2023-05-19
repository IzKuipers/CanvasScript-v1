import { CanvasError } from "../engine/error";
import type { Keyword, Param, ParsedParams } from "./interface";
import Background from "./keywords/bg";
import Color from "./keywords/color";
import Line from "./keywords/line";
import Rect from "./keywords/rect";
import Size from "./keywords/size";
import type { CanvasScriptLang } from "./main";

export class Parser {
  lang: CanvasScriptLang;

  keywords = {};

  constructor(engine: CanvasScriptLang) {
    this.lang = engine;
    this.keywords = {
      size: Size(this.lang),
      bg: Background(this.lang),
      color: Color(this.lang),
      line: Line(this.lang),
      rect: Rect(this.lang),
    };
  }

  evaluate(line: string) {
    if (!line.length) return;

    if (line.includes("  "))
      throw new CanvasError(`Repeated spaces are illegal`, this.lang);

    const split = line.replaceAll("  ", " ").split(" ");
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

      if (type != param.type)
        throw new CanvasError(
          `Parameter "${param.name}" has invalid type of "${type}" (must be "${param.type}")`,
          this.lang
        );

      parsed[param.name] = this.parseLiteralValue(segment);
    }

    keywordData.function(parsed);
  }

  getType(segment: string): "number" | "boolean" | "string" | "unknown" {
    if (!segment) return "unknown";

    if (segment.startsWith("#")) return "string";

    if ("true|false".includes(segment)) return "boolean";

    try {
      parseInt(segment);

      return "number";
    } catch {
      return "string";
    }
  }

  parseLiteralValue(segment: string): string | number | boolean {
    const type = this.getType(segment);

    if (type == "boolean") return segment == "true";
    if (type == "number") return parseInt(segment);
    if (type == "string") return segment;
  }
}
