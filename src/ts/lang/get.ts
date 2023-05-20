import { Parser } from "./parser";

export function getKeywordOfLine(line: string) {
  const parser = new Parser(null);

  return parser.keywords[line.split(" ")[0]];
}
