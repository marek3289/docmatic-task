import { SORT_ORDER, SortOrderType } from '@/types';
import { State, SortFunction, SortFieldType } from './types';

const sortAscending: SortFunction = (key) => (a, b) => {
  const firstKey = a[key];
  const secondKey = b[key];

  return typeof firstKey === 'string' && typeof secondKey === 'string'
    ? firstKey.localeCompare(secondKey)
    : firstKey === secondKey ? 0 : firstKey > secondKey ? 1 : -1;
}

const sortDescending: SortFunction = (key) => (a, b) => {
  const firstKey = a[key];
  const secondKey = b[key];

  return typeof firstKey === 'string' && typeof secondKey === 'string'
    ? secondKey.localeCompare(firstKey)
    : firstKey === secondKey ? 0 : firstKey > secondKey ? -1 : 1;
}

const sortDefault: SortFunction = () => () => 0;

const SORT_FUNCTIONS: Record<SortOrderType, SortFunction> = {
  [SORT_ORDER.DEFAULT]: sortDefault,
  [SORT_ORDER.ASC]: sortAscending,
  [SORT_ORDER.DESC]: sortDescending,
}

export const getFilteredMovies = (state: State) => {
  return [...state.movies]
    .filter((movie: any) => state.filterByYear ? movie.year === state.filterByYear : movie)
    .sort(SORT_FUNCTIONS[state.sortBy](state.sortField as SortFieldType))
}
