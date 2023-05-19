import type { Keyword } from "../interface";
import type { CanvasScriptLang } from "../main";

type Params = { color: string };

export default function Color(lang: CanvasScriptLang): Keyword {
  return {
    params: [
      {
        type: "string",
        name: "color",
      },
    ],
    function: (params: Params) => lang.engine.setColor(params.color),
  };
}
