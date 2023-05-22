export interface Keyword {
  params: Param[];
  function: (params: ParsedParams) => void | boolean;
}

export interface Param {
  type: ParamType;
  fillToEnd?: boolean;
  name: string;
}

export type ParsedParams = { [key: string]: number | string | boolean };
export type ParamType = "number" | "boolean" | "unknown" | "hex" | "any";
export type Hex = `#${string}`;
