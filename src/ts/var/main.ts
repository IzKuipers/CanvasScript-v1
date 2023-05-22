import { get, writable, type Writable } from "svelte/store";
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

export const PublicVariableStore = writable<VariableStore>({});

PublicVariableStore.subscribe((v) => {
  console.table(v);
});

export class Variables {
  private store: Writable<VariableStore> = writable<VariableStore>({});

  constructor() {
    this.store.subscribe((v) => PublicVariableStore.set(v));
  }

  async getAll(): Promise<VariableStore> {
    const result: VariableStore = {};
    const entries = Object.entries(get(this.store));

    for (let i = 0; i < entries.length; i++) {
      const key = entries[i][0];
      const value = this.get(key);

      result[key] = value;
    }

    return result;
  }

  get(key: string): string {
    const value = get(this.store)[key];

    return value || key;
  }

  async set(key: string, value: string) {
    const store = get(this.store);

    store[key] = value;

    this.store.set(store);
  }

  async delete(key: string): Promise<boolean> {
    const store = get(this.store);

    if (!store[key]) return false;

    await this.set(key, "");

    return true;
  }

  replace(str: string): string {
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
