import type { Keyword } from "./interface";

export const ScriptKeywords: { [key: string]: Keyword } = {
  size: {
    params: [
      {
        type: "boolean",
        name: "width",
      },
      {
        type: "boolean",
        name: "height",
      },
    ],
    function: (params) => true,
  },
};
