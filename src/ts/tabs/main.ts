import { get } from "svelte/store";
import { currentTabId, tabStore } from "./store";

export function switchTab(id: string): boolean {
  const tabs = get(tabStore);

  if (!tabs[id]) return false;

  currentTabId.set(id);

  return true;
}

export function newTab(content: string) {
  const r = () => Math.floor(Math.random() * 1e4);
  const id = `${r()}-${r()}-${r()}-${r()}-${r()}`;
  const tabs = get(tabStore);

  if (tabs[id]) return newTab(content); //prevents duplicate ID's

  tabs[id] = {
    content,
    caption: id,
    saved: false,
  };

  tabStore.set(tabs);
}

export function closeTab(id: string) {
  const tabs = get(tabStore);

  if (!tabs[id]) return false;

  delete tabs[id];

  tabStore.set(tabs);

  return true;
}
