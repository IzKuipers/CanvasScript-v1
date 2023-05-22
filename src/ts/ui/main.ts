import { writable } from "svelte/store";

export const VariablePaneVisible = writable<boolean>(false);
export const CanvasPaneVisible = writable<boolean>(true);
export const KeywordPaneVisible = writable<boolean>(false);
export const EditorVisible = writable<boolean>(true);
