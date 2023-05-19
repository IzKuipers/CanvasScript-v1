import type { Keyword } from "../interface";
import type { CanvasScriptLang } from "../main";

type Params = {
  start_x: number;
  start_y: number;
  end_x: number;
  end_y: number;
};

export default function Line(lang: CanvasScriptLang): Keyword {
  return {
    params: [
      {
        type: "number",
        name: "start_x",
      },
      {
        type: "number",
        name: "start_y",
      },
      {
        type: "number",
        name: "end_x",
      },
      {
        type: "number",
        name: "end_y",
      },
    ],
    function: (p: Params) =>
      lang.engine.line(p.start_x, p.start_y, p.end_x, p.end_y),
  };
}
