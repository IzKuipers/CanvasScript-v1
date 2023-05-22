import { writable, type Writable } from "svelte/store";
import type { TabStore } from "./interface";

export const tabStore: Writable<TabStore> = writable<TabStore>({});

export const currentTabId = writable<string>(null);
