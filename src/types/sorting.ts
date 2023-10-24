export enum SortMethod {
  Selection,
  Bubble,
}

export interface ISortingArrayHandler {
  sortDescending: () => Promise<void>;
  sortAscending: () => Promise<void>;
}
