import type { Keyword } from "../interface";
import type { CanvasScriptLang } from "../main";

type Params = {
  filled: boolean;
  x: number;
  y: number;
  diameter: number;
};

export default function Circle(lang: CanvasScriptLang): Keyword {
  return {
    params: [
      {
        type: "boolean",
        name: "filled",
      },
      {
        type: "number",
        name: "x",
      },
      {
        type: "number",
        name: "y",
      },
      {
        type: "number",
        name: "diameter",
      },
    ],
    function: (p: Params) =>
      lang.engine.eclipse(p.filled, p.x, p.y, p.diameter),
  };
}
