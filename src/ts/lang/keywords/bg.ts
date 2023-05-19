import type { Keyword } from "../interface";
import type { CanvasScriptLang } from "../main";

type Params = { color: string };

export default function Background(lang: CanvasScriptLang): Keyword {
  return {
    params: [
      {
        type: "hex",
        name: "color",
      },
    ],
    function: (params: Params) => lang.engine.setBackground(params.color),
  };
}
