export function getCalcExpressions(line: string) {
  // Regular expression to check for ?() and to ignore A-Z and a-z (to prevent code injection)
  const regex = /\?\((\d[^a-zA-z]+)\)/g;
  const matches: string[] = [];

  let match: RegExpExecArray | null;

  while ((match = regex.exec(line))) {
    matches.push(match[1]);
  }

  return matches;
}

export function calculateExpressions(line: string) {
  const expressions = getCalcExpressions(line);

  for (let i = 0; i < expressions.length; i++) {
    const value = eval(expressions[i]);
    const str = `?(${expressions[i]})`;

    line = line.replace(str, value);
  }

  return line;
}
