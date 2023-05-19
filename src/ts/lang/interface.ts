export interface Keyword {
  params: Param[];
  function: (params: ParsedParams) => void | boolean;
}

export interface Param {
  type: "number" | "string" | "boolean";
  fillToEnd?: boolean;
  name: string;
}

export type ParsedParams = { [key: string]: number | string | boolean };

export type ParamType = "number" | "string" | "boolean";
