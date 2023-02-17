export interface Movie {
  id: number;
  title: string;
  year: number;
  poster: string;
}

type PayloadAction<T, P> = { type: T; payload: P; }

type SimpleAction<T> = { type: T }

export type Action<T, P = undefined> = P extends undefined ? SimpleAction<T> : PayloadAction<T, P>;

export enum SORT_ORDER {
  DEFAULT = 'DEFAULT',
  ASC = 'ASC',
  DESC = 'DESC',
};

export type SortOrderType = keyof typeof SORT_ORDER;
