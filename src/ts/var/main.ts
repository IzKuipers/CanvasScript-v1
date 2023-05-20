import type { VariableStore } from "./interface";

/**
 * Modular Variable Store
 *
 * Derivated from original ArcTermVariables class of IzK-ArcOS/ArcOS-Frontend.
 * Made to have zero dependencies with other parts of the codebase.
 *
 * IzKuipers, May 20th 2023
 *
 */

export class Variables {
  private store: VariableStore = {};

  async getAll(): Promise<VariableStore> {
    const result: VariableStore = {};
    const entries = Object.entries(this.store);

    for (let i = 0; i < entries.length; i++) {
      const key = entries[i][0];
      const value = this.get(key);

      result[key] = value;
    }

    return result;
  }

  get(key: string) {
    if (!this.store[key]) return key;

    return this.store[key];
  }

  async set(key: string, value: string) {
    this.store[key] = value;
  }

  async delete(key: string) {
    if (!this.store[key]) return false;

    await this.set(key, "");

    return true;
  }

  replace(str: string) {
    const variables = this.parseInlineNames(str);

    if (!variables.length) return str;

    for (let i = 0; i < variables.length; i++) {
      const part = `$${variables[i]}`;

      const value = this.get(variables[i]);

      str = str.replace(part, value == variables[i] && part ? part : value);
    }

    return str;
  }

  private parseInlineNames(str: string): string[] {
    const regex = /\$([a-zA-Z_][a-zA-Z0-9_]*)/g;
    const matches: string[] = [];

    let match: RegExpExecArray | null;

    while ((match = regex.exec(str))) {
      matches.push(match[1]);
    }

    return matches;
  }

  public parse(line: string) {
    if (!line.startsWith("@") || line[1] == " ") return;

    line = line.replace("@", "");

    const split = line.split(" ");

    this.set(split[0], split[1]);
  }
}
