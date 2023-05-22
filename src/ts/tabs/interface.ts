export interface Tab {
  caption: string;
  content: string;
  saved: boolean;
  locked?: boolean;
}

export type TabStore = { [key: string]: Tab };
