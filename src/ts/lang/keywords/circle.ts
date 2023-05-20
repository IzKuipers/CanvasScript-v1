import type { Keyword } from "../interface";
import type { CanvasScriptLang } from "../main";

type Params = {
  filled: boolean;
  thickness: number;
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
        name: "thickness",
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
      lang.engine.eclipse(p.filled, p.thickness, p.x, p.y, p.diameter),
  };
}
