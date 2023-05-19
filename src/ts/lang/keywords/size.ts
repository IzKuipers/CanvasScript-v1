import type { Keyword } from "../interface";
import type { CanvasScriptLang } from "../main";

type Params = { width: number; height: number };

export default function Size(lang: CanvasScriptLang): Keyword {
  return {
    params: [
      {
        type: "number",
        name: "width",
      },
      {
        type: "number",
        name: "height",
      },
    ],
    function: (params: Params) => lang.engine.size(params.width, params.height),
  };
}
