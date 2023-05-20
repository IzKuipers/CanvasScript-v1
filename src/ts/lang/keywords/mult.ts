import type { Keyword } from "../interface";
import type { CanvasScriptLang } from "../main";

type Params = {
  factor: number;
};

export default function Multiplier(lang: CanvasScriptLang): Keyword {
  return {
    params: [
      {
        type: "number",
        name: "factor",
      },
    ],
    function: (p: Params) => lang.engine.multiplication(p.factor),
  };
}
