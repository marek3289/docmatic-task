import { Movie, Action, SORT_ORDER, SortOrderType } from '@/types';

export enum ActionTypes {
  SORT_MOVIES = 'SORT_MOVIES',
  FILTER_BY_YEAR = 'FILTER_BY_YEAR',
  CLEAR_FILTERS = 'CLEAR_FILTERS',
}

export type SortFieldType = 'title' | 'year';

export type SortKey = keyof Pick<Movie, SortFieldType>;

export interface State {
  movies: Movie[];
  sortField: string;
  sortBy: SortOrderType;
  filterByYear: number | null | '';
}

export type ActionType =
  | Action<ActionTypes.SORT_MOVIES, string>
  | Action<ActionTypes.FILTER_BY_YEAR, number | ''>
  | Action<ActionTypes.CLEAR_FILTERS>;

export type ReducerFunction = (state: State, action: ActionType) => State;

export type SortFunction = (key: SortKey) => (a: Movie, b: Movie) => number
